import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable } from 'rxjs';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { MealService } from '../../../../../../shared/services/meal.service';
import { OrderService } from '../../../../../../shared/services/order.service';
import { OrderItemService } from '../../../../../../shared/services/orderitem.service';
import { RestaurantService } from '../../../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-meal-delete-dialog',
  templateUrl: './delete.component.html',
})
export class MealDeleteDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private mealId: number;
  private mealName: string;
  private restaurantId: number;
  private managerId: string;
  private currentUserId: string;
  private orders;

  constructor(private toastr: ToastrService, private orderService: OrderService, private authorizeService: AuthorizationService, private restaurantService: RestaurantService, private mealService: MealService, private router: Router, private orderItemService: OrderItemService) {
    this.actionButtons = [
      {
        text: 'Remove', onAction: () => {
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue.');
            return false;
          }
          if (!this.managerId || this.currentUserId !== this.managerId) {
            this.toastr.error('You do not have permisssion to remove this meal.');
            return false;
          }
          this.orderItemService.getOrderItems().subscribe(
            _items => {
              const items = (_items.body as Array<any>).filter(item => item['mealId'] == this.mealId && item['status'] == 0);
              if (items.length) {
                const observables: Array<Observable<any>> = [];
                console.log(items);
                for (const item of items) {
                  item['status'] = 3;
                  observables.push(this.orderItemService.putOrderItem(item['id'], item));
                }
                forkJoin(observables).subscribe(
                  result => {
                    const _orders = this.orders.filter(order => (order['items'] as Array<any>).filter(item => items.includes(item)));
                    let orderObservables: Array<Observable<any>> = [];
                    for (const order of _orders) {
                      if (this.isCancellable(order)) {
                        order['status'] = 5;
                        orderObservables.push(this.orderService.putOrder(order['id'], order));
                      }
                      else if (this.isDeliverable(order)) {
                        order['status'] = 3;
                        orderObservables.push(this.orderService.putOrder(order['id'], order));
                      }
                    }
                    forkJoin(orderObservables).subscribe(
                      result => {
                        this.mealService.deleteMeal(this.mealId).subscribe(
                          result => {
                            this.toastr.success('Meal was removed successfully.');
                            window.location.reload();
                          },
                          error => console.log(error)
                        );
                      },
                      error => console.log(error)
                    );
                  },
                  error => console.log(error)
                );
              }
              else {
                this.mealService.deleteMeal(this.mealId).subscribe(
                  result => {
                    this.toastr.success('Meal was removed successfully.');
                    window.location.reload();
                  },
                  error => console.log(error)
                );
              }
            }
          )

          return true;
        },
        buttonClass: 'btn-rounded bg-danger'
      },
      { text: 'Close', onAction: () => true, buttonClass: 'btn-rounded' },
    ];
    this.authorizeService.getUser().subscribe(
      user => this.currentUserId = user && user['id'],
      error => console.log(error)
    );
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.mealId = options.data.mealId;
    this.mealService.getMeal(this.mealId).subscribe(
      meal => {
        this.mealName = meal['name'];
        this.restaurantId = parseInt(meal['restaurantId']);
        this.managerId = meal['restaurant']['managerId'];
      },
      error => console.log(error)
    );
    this.orderService.getOrders().subscribe(
      orders => this.orders = orders.body as [] || [],
      error => console.log(error)
    );
  }

  isCancellable(order) {
    return (order['items'] as Array<any>).filter(item => item['status'] == 0 || item['status'] == 1 || item['status'] == 2).length == 0;
  }

  isDeliverable(order) {
    const all = (order['items'] as Array<any>).length;
    const prepared = (order['items'] as Array<any>).filter(item => item['status'] == 2).length;
    const queuedAndPreparing = (order['items'] as Array<any>).filter(item => item['status'] == 0 || item['status'] == 1).length;
    const cancelled = (order['items'] as Array<any>).filter(item => item['status'] == 3).length;
    const equal = all == (prepared + cancelled);
    return queuedAndPreparing == 0 && equal;
  }
}
