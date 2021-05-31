import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastr: ToastrService) {

  }

  get(): Array<any> {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  private set(cart) {
    localStorage.setItem('cart', JSON.stringify(cart || []));
  }

  setAddress(address) {
    localStorage.setItem('address', JSON.stringify(address));
  }

  getAddress() {
    return JSON.parse(localStorage.getItem('address'));
  }

  clearAddress() {
    localStorage.removeItem('address');
  }

  setQuantity(mealId, quantity) {
    const cart = this.get();
    const index = cart.findIndex(item => item.mealId === mealId);
    if (index >= 0) {
      if (quantity <= 0 || quantity > 10) {
        this.toastr.error('Can not order more than 10 of the same meal.');
        return;
      }
      cart[index].quantity = quantity;
    }
    this.set(cart);
    console.log(mealId);
    console.log(quantity);
  }

  push(item) {
    const cart = this.get();
    const index = cart.findIndex(_item => _item.mealId === item.mealId);
    if (index >= 0) {
      item.quantity = item.quantity ? item.quantity : 1;
      const totalQuantity = cart[index].quantity + item.quantity;
      if (totalQuantity > 10) {
        this.toastr.error('Can not order more than 10 of the same meal.');
        return false;
      }
      cart[index].quantity = totalQuantity;
    }
    else {
      cart.push(item);
    }
    this.set(cart);
    return true;
  }

  remove(mealId) {
    const cart = this.get();
    const index = cart.findIndex(item => item.mealId === mealId);
    if (index >= 0) {
      cart.splice(index, 1);
    }
    this.set(cart);
  }

  clear() {
    localStorage.removeItem('cart');
  }

  get length() {
    return this.get().length;
  }
}
