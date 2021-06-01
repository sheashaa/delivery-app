import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions, ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable } from 'rxjs';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { OrderService } from '../../shared/services/order.service';
import { OrderItemService } from '../../shared/services/orderitem.service';

@Component({
  selector: 'app-order-cancel',
  templateUrl: './cancel.component.html'
})
export class OrderCancelComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private isAuthenticated;
  private orderId: number;
  private order;

  constructor(private toastr: ToastrService, private orderService: OrderService, private orderItemService: OrderItemService, private authorizeService: AuthorizationService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Cancel', onAction: () => {
          if (!this.isAuthenticated) {
            this.toastr.error('Please login to continue.');
            return true;
          }

          if (this.order['status'] === 0) {
            this.orderItemService.getOrderItems().subscribe(
              _items => {
                const items = (_items.body as Array<any>).filter(item => item['orderId'] == this.orderId);
                let observables: Array<Observable<any>> = [];
                let flag = false;
                for (const item of items) {
                  if (item['status'] == 1 || item['status'] == 2) {
                    flag = true;
                    break;
                  }
                  else {
                    item['status'] = 3;
                    observables.push(this.orderItemService.putOrderItem(item['id'], item));
                  }
                }
                if (flag) {
                  this.toastr.error('Could not cancel your order.');
                } else {
                  forkJoin(observables).subscribe(
                    result => {
                      this.order['status'] = 5;
                      this.orderService.putOrder(this.orderId, this.order).subscribe(
                        result => {
                          this.toastr.success('Order was cancelled successfully.');
                          window.location.reload();
                        },
                        error => {
                          console.log(error);
                          this.toastr.error('Can not cancel your order as it has been processed.')
                        }
                      );
                    },
                    error => console.log('Could not complete your request.')
                  );
                }
              },
              error => console.log(error)
            );
          } else {
            this.toastr.error('Can not cancel your order as it has been processed.');
          }

          return true;
        },
        buttonClass: 'btn-rounded bg-danger'
      },
      { text: 'Close', onAction: () => true, buttonClass: 'btn-rounded' },
    ];

    this.authorizeService.isAuthenticated().subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated,
      error => console.log(error)
    );
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.orderId = options.data.orderId;
    this.orderService.getOrder(this.orderId).subscribe(
      order => this.order = order,
      error => console.log(error)
    );
  }
}
