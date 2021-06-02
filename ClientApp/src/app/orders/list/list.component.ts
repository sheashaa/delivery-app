import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { DeliveryService } from '../../shared/services/delivery.service';
import { OrderService } from '../../shared/services/order.service';
import { AddressComponent } from '../address/address.component';
import { OrderCancelComponent } from '../cancel/cancel.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './list.component.html'
})
export class OrdersListComponent implements OnInit {
  private currentUserId: string;
  private currentUserRole: string;

  private isCourier: boolean;
  private isCourierAvailable: boolean;

  private orders;
  private currentDeliveringOrderId;

  private showQueued;
  private showPreparing;
  private showPrepared;
  private showDelivering;
  private showDelivered;
  private showCancelled;

  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private toastr: ToastrService, private authorizeService: AuthorizationService, private orderService: OrderService, private deliveryService: DeliveryService, private router: Router) {
    this.authorizeService.getUser().subscribe(
      user => {
        this.currentUserId = user && user['id'];
        this.currentUserRole = user && user['role'];
        this.isCourier = this.currentUserRole === 'Courier';
        //this.isCustomer = this.currentUserRole === 'Customer';
        if (this.isCourier) {
          this.deliveryService.getDeliveries().subscribe(
            _deliveries => {
              const deliveries = _deliveries.body as [] || [];
              const courierDeliveries = deliveries.filter(delivery => delivery['courierId'] == this.currentUserId && delivery['order']['status'] == 3);
              this.isCourierAvailable = courierDeliveries.length == 0;
              if (!this.isCourierAvailable) {
                this.currentDeliveringOrderId = courierDeliveries[0]['orderId'];
              }
              else {
                this.currentDeliveringOrderId = null;
              }
            },
            error => console.log(error)
          );
        }
        
      },
      error => console.log(error)
    );
    this.showQueued = true;
    this.showPreparing = false;
    this.showPrepared = false;
    this.showDelivering = false;
    this.showDelivered = false;
    this.showCancelled = false;
  }

  ngOnInit() {
    this.getOrders();
  }

  cancel(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      childComponent: OrderCancelComponent,
      title: 'Cancel Order',
      data: {
        orderId: id
      }
    });
  }

  changeAddress(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      childComponent: AddressComponent,
      title: 'Change your address',
      data: {
        isNewOrder: false,
        orderId: id
      }
    });
  }

  getDateTime(dateTime) {
    return new Date(Date.parse(dateTime)).toLocaleString();
  }

  sortDateTime(a, b) {
    return Date.parse(b['dateTime']) - Date.parse(a['dateTime']);
  }

  getOrders() {
    this.orders = [];
    this.orderService.getOrders().subscribe(
      _orders => {
        let orders: Array<any> = _orders.body as [];
        if (this.currentUserRole == 'Customer') {
          orders = orders.filter(order => order['customerId'] == this.currentUserId);
        }
        if (this.showQueued) {
          const target = orders.filter(order => order['status'] === 0);
          target.sort(this.sortDateTime);
          this.orders.splice(this.orders.length, 0, ...target);
        }
        if (this.showPreparing) {
          const target = orders.filter(order => order['status'] === 1);
          target.sort(this.sortDateTime);
          this.orders.splice(this.orders.length, 0, ...target);
        }
        if (this.showPrepared) {
          const target = orders.filter(order => order['status'] === 2);
          target.sort(this.sortDateTime);
          this.orders.splice(this.orders.length, 0, ...target);
        }
        if (this.showDelivering) {
          const target = orders.filter(order => order['status'] === 3);
          target.sort(this.sortDateTime);
          this.orders.splice(this.orders.length, 0, ...target);
        }
        if (this.showDelivered) {
          const target = orders.filter(order => order['status'] === 4);
          target.sort(this.sortDateTime);
          this.orders.splice(this.orders.length, 0, ...target);
        }
        if (this.showCancelled) {
          const target = orders.filter(order => order['status'] === 5);
          target.sort(this.sortDateTime);
          this.orders.splice(this.orders.length, 0, ...target);
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
      case 3: return 'bg-danger text-light';
      case 4: return 'bg-warning';
      case 5: return 'bg-info';
    }
  }

  getStatus(status) {
    switch (status) {
      case 0: return 'Queued';
      case 1: return 'Preparing';
      case 2: return 'Prepared';
      case 3: return 'Delivering';
      case 4: return 'Delivered';
      case 5: return 'Cancelled';
    }
  }

  isQueued(status) {
    return status === 0;
  }

  isDeliverable(status) {
    return status == 2;
  }

  goToCurrentDelivery() {
    console.log('hero');
    if (this.currentDeliveringOrderId) {
      this.router.navigate(['./orders/details', this.currentDeliveringOrderId]);
    }
  }

  deliver(order) {
    const delivery = {
      orderId: order['id'],
      courierId: this.currentUserId
    };
    this.deliveryService.postDelivery(delivery).subscribe(
      delivery => {
        order['status'] = 3;
        this.orderService.putOrder(order['id'], order).subscribe(
          result => {
            this.toastr.success(`You are delivering Order: #${order['id']}. Please go to current delivery page to track order.`);
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  isCustomer(order) {
    return order['customerId'] == this.currentUserId;
  }
}
