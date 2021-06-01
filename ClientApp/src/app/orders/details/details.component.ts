import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { OrderService } from '../../shared/services/order.service';
import { OrderItemService } from '../../shared/services/orderitem.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './details.component.html'
})
export class OrdersDetailsComponent {
  private orderId;
  private order;
  private currentUserId;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private orderService: OrderService, private authorizeService: AuthorizationService, private router: Router, private orderItemService: OrderItemService) {

    this.route.params.subscribe(
      params => {
        this.orderId = params['id'];
        this.orderService.getOrder(this.orderId).subscribe(
          order => {
            this.order = order;
            console.log(this.order);
            this.authorizeService.getUser().subscribe(
              user => {
                this.currentUserId = user && user['id'];
                if (this.currentUserId != this.order['customer']['id']) {
                  this.router.navigate(['./']);
                }
              },
              error => console.log(error)
            );
          }
        );
      }
    );
  }

  getDateTime(dateTime) {
    return new Date(Date.parse(dateTime)).toLocaleString();
  }


  getItemStatusClass(status) {
    switch (status) {
      case 0: return 'bg-primary';
      case 1: return 'bg-secondary';
      case 2: return 'bg-success';
      case 3: return 'bg-info';
    }
  }

  getOrderStatusClass(status) {
    switch (status) {
      case 0: return 'bg-primary';
      case 1: return 'bg-secondary';
      case 2: return 'bg-success';
      case 3: return 'bg-danger text-light';
      case 4: return 'bg-warning';
      case 5: return 'bg-info';
    }
  }

  getItemStatus(status) {
    switch (status) {
      case 0: return 'Queued';
      case 1: return 'Preparing';
      case 2: return 'Prepared';
      case 3: return 'Cancelled';
    }
  }

  getOrderStatus(status) {
    switch (status) {
      case 0: return 'Queued';
      case 1: return 'Preparing';
      case 2: return 'Prepared';
      case 3: return 'Delivering';
      case 4: return 'Delivered';
      case 5: return 'Cancelled';
    }
  }

  cancel(item) {
    this.orderService.getOrder(item['orderId']).subscribe(
      order => {
        if (order['status'] == 5) {
          this.toastr.error('Order has been cancelled');
        }
        else {
          item['status'] = 3;
          const itemIndex = (order['items'] as Array<any>).findIndex(_item => _item['id'] == item['id']);
          if (itemIndex >= 0) {
            order['items'][itemIndex]['status'] = 3;
          }
          console.log(order);
          if (this.isCancellable(order)) {
            order['status'] = 5;
          }
          else if (this.isDeliverable(order)) {
            order['status'] = 3;
          }

          this.orderItemService.putOrderItem(item['id'], item).subscribe(
            result => {
              this.orderService.putOrder(order['id'], order).subscribe(
                result => {
                  window.location.reload();
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

  getTotal() {
    let total = 0;
    for (const item of this.order['items']) {
      if (item['status'] > 0 && item['status'] < 3) total += item['quantity'] * item['price'];
    }
    return total;
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
