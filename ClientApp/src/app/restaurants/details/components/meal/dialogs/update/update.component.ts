import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { MealService } from '../../../../../../shared/services/meal.service';
import { RestaurantService } from '../../../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-meal-update-dialog',
  templateUrl: './update.component.html',
})
export class MealUpdateDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private mealId: number;
  private name: string;
  private description: string;
  private price: number;
  private image: string;
  private menuTag: string;
  private restaurantId: number;
  private managerId: string;
  private currentUserId: string;
  private menu;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private restaurantService: RestaurantService, private mealService: MealService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Update', onAction: () => {
          if (!this.name || !this.name.length) {
            this.toastr.error('Please enter meal name', 'error');
            return true;
          }
          if (!this.description || !this.description.length) {
            this.toastr.error('Please enter meal description', 'error');
            return true;
          }
          if (!this.price || Number.isNaN(this.price)) {
            this.toastr.error('Please enter meal price', 'error');
            return true;
          }
          if (!this.menuTag || !this.menuTag.length) {
            this.toastr.error('Please select meal menu tag', 'error');
            return true;
          }
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue', 'error');
            return true;
          }
          if (!this.managerId || this.currentUserId !== this.managerId) {
            this.toastr.error('You do not have permisssion to add this meal', 'error');
            return true;
          }
          const meal = {
            id: this.mealId,
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
            menuTag: this.menuTag,
            restaurantId: this.restaurantId
          };

          console.log(meal);

          this.mealService.putMeal(this.mealId, meal).subscribe(data => {
            console.log(data);
            this.toastr.success('Meal was updated successfully', 'success');
            window.location.reload();
          });
          return true;
        }
      },
      { text: 'Close', onAction: () => true },
    ];
    this.authorize.getUser().subscribe(u => this.currentUserId = u && u.id);
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.mealId = options.data.mealId;
    this.mealService.getMeal(this.mealId).subscribe(meal => {
      this.name = meal['name'];
      this.description = meal['description'];
      this.price = parseFloat(meal['price']);
      this.image = meal['image'];
      this.menuTag = meal['menuTag'];
      this.restaurantId = parseInt(meal['restaurantId']);
      this.managerId = meal['restaurant']['managerId'];
      this.menu = meal['restaurant']['menu'];
    });
  }

  uploaded(event) {
    this.image = event.imagePath;
  }
}
