import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { CartService } from '../../../../../../shared/services/cart.service';
import { MealService } from '../../../../../../shared/services/meal.service';
import { RestaurantService } from '../../../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-meal-details-dialog',
  templateUrl: './details.component.html',
})
export class MealDetailsDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private name: string;
  private description: string;
  private price: number;
  private image: string;
  private mealId: number;

  constructor(private toastr: ToastrService, private mealService: MealService, private cartService: CartService) {
    this.actionButtons = [
      {
        text: 'Add To Cart', onAction: () => {
          if (this.mealId) {
            const item = {
              mealId: this.mealId,
              name: this.name,
              quantity: 1,
              price: this.price,
              image: this.image
            };
            console.log(item);
            this.cartService.push(item);
            this.toastr.success('Meal was added to cart');
            return true;
          }
        }
      },
      { text: 'Close', onAction: () => true },
    ];
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.mealId = options.data.mealId;
    this.mealService.getMeal(this.mealId).subscribe(meal => {
      this.name = meal['name'];
      this.description = meal['description'];
      this.price = parseFloat(meal['price']);
      this.image = meal['image'];
    });
  }



}
