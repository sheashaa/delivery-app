import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { OrderService } from '../../shared/services/order.service';
import { AddressComponent } from '../address/address.component';
import { OrderCancelComponent } from '../cancel/cancel.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './list.component.html'
})
export class OrdersListComponent {
  private currentUserId: string;
  private orders;

  private showQueued;
  private showPreparing;
  private showPrepared;
  private showDelivering;
  private showDelivered;
  private showCancelled;

  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private toastr: ToastrService, private authorizeService: AuthorizationService, private orderService: OrderService) {
    this.authorizeService.getUser().subscribe(
      user => this.currentUserId = user && user['id'],
      error => console.log(error)
    );
    this.showQueued = true;
    this.showPreparing = false;
    this.showPrepared = false;
    this.showDelivering = false;
    this.showDelivered = false;
    this.showCancelled = false;
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
        const orders = _orders.body as [];
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
}
