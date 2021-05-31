import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions, ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-cancel',
  templateUrl: './cancel.component.html'
})
export class OrderCancelComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private isAuthenticated;
  private orderId: number;
  private order;

  constructor(private toastr: ToastrService, private orderService: OrderService, private authorizeService: AuthorizationService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Cancel', onAction: () => {
          if (!this.isAuthenticated) {
            this.toastr.error('Please login to continue.');
            return true;
          }

          if (this.order['status'] === 0) {
            this.order['status'] = 5;
            this.orderService.putOrder(this.orderId, this.order).subscribe(
              result => {
                this.toastr.success('Order was cancelled successfully.');
                window.location.reload();
              },
              error => {
                console.log(error);
                this.toastr.error('Could not cancel your order.')
              }
            );
          } else {
            this.toastr.error('Can not cancelled your order as it has been processed.');
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
