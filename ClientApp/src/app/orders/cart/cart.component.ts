import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { OrderItemService } from '../../shared/services/orderitem.service';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {

  private currentUserId: boolean;
  private _cart;
  private total: number;

  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private toastr: ToastrService, private cart: CartService, private authService: AuthorizationService, private router: Router, private orderService: OrderService, private orderItemService: OrderItemService) {
    authService.getUser().subscribe(user => this.currentUserId = user.id);
    this.refresh();
  }

  refresh() {
    this._cart = this.cart.get();
    this.total = 0;
    for (const item of this._cart) {
      this.total += item.price * item.quantity;
    }
    this.total = parseFloat(this.total.toFixed(2));
  }

  delete(mealId) {
    this.cart.remove(mealId);
    this.refresh();
  }

  checkOut() {
    this.modalDialogService.openDialog(this.viewContainer, {
      childComponent: AddressComponent,
      title: 'Set your location',
      data: {
        isNewOrder: true
      }
    });
  }

  changeQuantity(event, mealId) {
    this.cart.setQuantity(mealId, event.target.value);
    this.refresh();
  }
}
