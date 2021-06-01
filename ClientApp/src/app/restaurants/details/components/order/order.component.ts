import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../shared/authorization/authorization.service';
import { OrderService } from '../../../../shared/services/order.service';
import { OrderItemService } from '../../../../shared/services/orderitem.service';

@Component({
  selector: 'app-resturants-orders',
  templateUrl: './order.component.html',
})
export class RestaurantOrdersComponent implements OnInit {
  @Input() public restaurantId: number;
  private currentUserId: string;
  private orderItems;

  private showQueued;
  private showPreparing;
  private showPrepared;
  private showCancelled;

  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private toastr: ToastrService, private authorizeService: AuthorizationService, private orderService: OrderService, private orderItemService: OrderItemService) {
    this.authorizeService.getUser().subscribe(
      user => this.currentUserId = user && user['id'],
      error => console.log(error)
    );
    this.showQueued = true;
    this.showPreparing = false;
    this.showPrepared = false;
    this.showCancelled = false;
  }

  ngOnInit() {
    this.getOrderItems();
  }

  getDateTime(dateTime) {
    return new Date(Date.parse(dateTime)).toLocaleString();
  }

  sortDateTime(a, b) {
    return Date.parse(b['dateTime']) - Date.parse(a['dateTime']);
  }

  getOrderItems() {
    this.orderItems = [];
    this.orderService.getOrders().subscribe(
      _orders => {
        const orders = (_orders.body as []).sort(this.sortDateTime);
        console.log(orders);
        let orderItems = [];
        for (const order of orders) {
          const ois = (order['items'] as Array<any>);
          ois.forEach(item => item.dateTime = order['dateTime']);
          orderItems = [...orderItems, ...ois];
        }
        console.log(orderItems);
        orderItems = orderItems.filter(item => item['restaurantId'] == this.restaurantId);
        console.log(orderItems);
        if (this.showQueued) {
          const target = orderItems.filter(item => item['status'] === 0);
          this.orderItems = [...this.orderItems, ...target];
        }
        if (this.showPreparing) {
          const target = orderItems.filter(item => item['status'] === 1);
          this.orderItems = [...this.orderItems, ...target];
        }
        if (this.showPrepared) {
          const target = orderItems.filter(item => item['status'] === 2);
          this.orderItems = [...this.orderItems, ...target];
        }
        if (this.showCancelled) {
          const target = orderItems.filter(item => item['status'] === 3);
          this.orderItems = [...this.orderItems, ...target];
        }
      },
      error => console.log(error)
    );
  }

  getStatusClass(status) {
    switch (status) {
      case 0: return 'bg-primary';
      case 1: return 'bg-secondary';
      case 2: return 'bg-success';
      case 3: return 'bg-info';
    }
  }

  getStatus(status) {
    switch (status) {
      case 0: return 'Queued';
      case 1: return 'Preparing';
      case 2: return 'Prepared';
      case 3: return 'Cancelled';
    }
  }

  setStatus(orderItem, status) {
    this.orderService.getOrder(orderItem['orderId']).subscribe(
      order => {
        if (order['status'] == 5) {
          this.toastr.error('Order has been cancelled');
        }
        else {
          console.log(order);
          const itemIndex = (order['items'] as Array<any>).findIndex(item => item['id'] == orderItem['id']);
          if (itemIndex >= 0) {
            order['items'][itemIndex]['status'] = status;
          }
          console.log(order);
          const allDone = (order['items'] as Array<any>).filter(item => item['status'] == 0 || item['status'] == 1).length == 0;
          order['status'] = allDone ? 2 : 1;
          orderItem['status'] = status;

          this.orderItemService.putOrderItem(orderItem['id'], orderItem).subscribe(
            result => {
              this.orderService.putOrder(order['id'], order).subscribe(
                result => {
                  this.getOrderItems();
                },
                error => console.log(error)
              )
            },
            error => console.log(error)
          );
        }
      },
      error => console.log(error)
    );

  }
}
