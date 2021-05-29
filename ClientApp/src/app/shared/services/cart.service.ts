import { Injectable } from '@angular/core';
import { MealService } from './meal.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private mealService: MealService) {

  }

  get(): Array<any> {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  private set(cart) {
    localStorage.setItem('cart', JSON.stringify(cart || []));
  }

  push(item) {
    const cart = this.get();
    const index = cart.findIndex(_item => _item.mealId === item.mealId);
    if (index >= 0) {
      cart[index].quantity += item.quantity ? item.quantity : 1;
    }
    else {
      cart.push(item);
    }
    this.set(cart);
  }

  remove(mealId) {
    const cart = this.get();
    const index = cart.findIndex(item => item.mealId === mealId);
    if (index >= 0) {
      cart.splice(index, 1);
    }
    this.set(cart);
  }

  increment(mealId) {
    const cart = this.get();
    const index = cart.findIndex(item => item.mealId === mealId);
    if (index >= 0) {
      console.log(cart[index]);
      cart[index].quantity++;
      this.set(cart);
    }
    else {
      this.mealService.getMeal(mealId).subscribe(meal => {
        if (meal) {
          const item = {
            mealId,
            name: meal['name'],
            quantity: 1,
            price: meal['price'],
            image: meal['image']
          }
          this.push(item);
        }
      })
    }
  }

  decrement(mealId) {
    const cart = this.get();
    const index = cart.findIndex(item => item.mealId === mealId);
    if (index >= 0) {
      console.log(cart[index]);
      cart[index].quantity = (cart[index].quantity - 1) || 1;
      this.set(cart);
    }
  }

  clear() {
    localStorage.removeItem('cart');
  }

  get length() {
    return this.get().length;
  }
}
