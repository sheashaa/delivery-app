import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { OrderItemService } from '../../shared/services/orderitem.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {

  private currentUserId: boolean;
  private _cart;
  private total: number;

  constructor(private toastr: ToastrService, private cart: CartService, private authService: AuthorizationService, private router: Router, private orderService: OrderService, private orderItemService: OrderItemService) {
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
    if (!this.currentUserId) {
      this.toastr.error('Please login to continue', 'error');
      return;
    }
    if (!this.cart.length) {
      this.toastr.error('Cart is empty', 'error');
      return;
    }
    this.orderService.postOrder({ customerId: this.currentUserId }).subscribe(order => {

      const orderId = order['id'];
      const cart = this.cart.get();
      for (const item of cart) {
        const orderItem = {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount,
          orderId,
          mealId: item.mealId
        };

        this.orderItemService.postOrderItem(orderItem).subscribe(
        //  null, error => {

        //  if (error) {
        //  this.toastr.error('something horribe happened. aborting...', 'error');
        //    this.orderService.deleteOrder(orderId).subscribe(result => {
        //      return;
        //    })
        //  }
        //}
        );
      }
      this.cart.clear();
      this.refresh();
    });


  }

  changeQuantity(event, mealId) {
    this.cart.setQuantity(mealId, event.target.value);
    this.refresh();
  }
}
