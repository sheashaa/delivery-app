import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './list.component.html'
})
export class OrdersListComponent {
  private currentUserId: string;
  private orders;
  

  constructor(private toastr: ToastrService, private authService: AuthorizationService, private orderService: OrderService) {
    this.authService.getUser().subscribe(user => this.currentUserId = user && user.id);
    this.orderService.getOrders().subscribe(orders => {
      if (orders) {
        console.log(orders);
        this.orders = orders.body || [];
      }
    });
  }

  viewOrderDetails(id) {
    
  }

  cancel(id) {
    this.orderService.getOrder(id).subscribe(order => {
      if (order) {
        if (order['status'] === 0) {
          this.orderService.deleteOrder(id).subscribe();
          this.toastr.success('Order was cancelled');
          this.refresh();
          return;
        } else {
          this.toastr.error('Can not cancel order as it has been processed', 'error');
          return;
        }
      }
    });
  }

  isQueued(status) {
    return status === 0;
  }

  getStatus(status) {
    switch (status) {
      case 0:
        return 'Queued';
      case 1:
        return 'Being Delivered';
      case 2:
        return 'Delivered';
      case 3:
        return 'Cancelled';
    }
  }

  parseDateTime(dateTime) {
    return new Date(Date.parse(dateTime)).toString();
  }

  refresh() {
    this.orderService.getOrders().subscribe(orders => {
      if (orders) {
        console.log(orders);
        this.orders = orders.body || [];
      }
    });
  }
}
