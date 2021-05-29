import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { DeliveryService } from '../../shared/services/delivery.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './list.component.html'
})
export class DeliveryListComponent {

  private currentUserId;
  private isCourierFree: boolean = true;
  private orders: [];

  private showQueued: boolean;
  private showBeingDelivered: boolean;
  private showDelivered: boolean;
  private showCancelled: boolean;

  constructor(private toastr: ToastrService, private deliveryService: DeliveryService, private orderService: OrderService, private authService: AuthorizationService) {
    this.authService.getUser().subscribe(user => this.currentUserId = user && user['id']);
    this.deliveryService.getDeliveries().subscribe(data => {
      if (data) {
        const deliveries = data.body as [];
        const courierCurrentDeliveries = deliveries.filter(delivery => delivery['courierId'] === this.currentUserId && delivery['order']['status'] === 1);
        this.isCourierFree = courierCurrentDeliveries.length === 0;
      }
    });

    this.showQueued = true;
    this.showBeingDelivered = false;
    this.showDelivered = false;
    this.showCancelled = false;

    this.getOrders();
  }

  getOrders() {
    this.orders = [];
    this.orderService.getOrders().subscribe(data => {
      if (data) {
        const orders = data.body as [];
        if (this.showQueued) {
          const target = orders.filter(order => order['status'] === 0);
          this.orders.splice(this.orders.length, 0, ...target);
        }
        if (this.showBeingDelivered) {
          const target = orders.filter(order => order['status'] === 1);
          this.orders.splice(this.orders.length, 0, ...target);
        }
        if (this.showDelivered) {
          const target = orders.filter(order => order['status'] === 2);
          this.orders.splice(this.orders.length, 0, ...target);
        }
        if (this.showCancelled) {
          const target = orders.filter(order => order['status'] === 3);
          this.orders.splice(this.orders.length, 0, ...target);
        }
        console.log(this.orders);
      }
    });
  }

  getStatusClass(status) {
    switch (status) {
      case 0:
        return 'bg-primary';
      case 1:
        return 'bg-danger text-light';
      case 2:
        return 'bg-secondary';
      case 3:
        return 'bg-dark';
    }
  }


  isQueued(status) {
    return status === 0;
  }

  getOrderStatus(status) {
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

  getDateTime(dateTime) {
    return new Date(Date.parse(dateTime)).toLocaleString();
  }

  deliver(order) {
    this.deliveryService.getDeliveries().subscribe(data => {
      const deliveries = data.body as [];
      const courierCurrentDeliveries = deliveries.filter(delivery => delivery['courierId'] === this.currentUserId && delivery['order']['status'] === 1);
      this.isCourierFree = courierCurrentDeliveries.length === 0;

      if (this.isCourierFree) {
        order.status = 1;
        this.orderService.putOrder(order.id, order).subscribe(
          result => {
            const delivery = {
              courierId: this.currentUserId,
              orderId: order.id
            };
            this.deliveryService.postDelivery(delivery).subscribe(result => {
              this.toastr.success(`You are to deliver Order: ${order.id}. Go to 'Current Delivery' to track order and customer`);
              this.isCourierFree = false;

            });
          },
          error => {
            this.toastr.error('Something horrible happended. aborting...', 'error');
          }
        );

      }
      else {
        this.toastr.error('You are currently delivering another order', 'error');
      }
    });
  }
}
