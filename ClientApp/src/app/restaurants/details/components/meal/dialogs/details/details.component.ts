import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
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
  private menuTag: string;
  private restaurantId: number;
  private managerId: string;
  private currentUserId: string;
  private menu;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private restaurantService: RestaurantService, private mealService: MealService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Add', onAction: () => {
          if (!this.name || !this.name.length) {
            this.toastr.error('Please enter meal name', 'error');
            return;
          }
          if (!this.description || !this.description.length) {
            this.toastr.error('Please enter meal description', 'error');
            return;
          }
          if (!this.price || Number.isNaN(this.price)) {
            this.toastr.error('Please enter meal price', 'error');
            return;
          }
          if (!this.menuTag || !this.menuTag.length) {
            this.toastr.error('Please select meal menu tag', 'error');
            return;
          }
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue', 'error');
            return;
          }
          if (!this.managerId || this.currentUserId !== this.managerId) {
            this.toastr.error('You do not have permisssion to add this meal', 'error');
            return;
          }
          const meal = {
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
            menuTag: this.menuTag,
            restaurantId: this.restaurantId
          };

          console.log(meal);

          this.mealService.postMeal(meal).subscribe(data => {
            console.log(data);
            this.toastr.success('Meal was added successfully', 'success');
            this.router.navigate(['./restaurants/details/', this.restaurantId]);
          });
          return true;
        }
      },
      { text: 'Close', onAction: () => true },
    ];
    this.authorize.getUser().subscribe(u => this.currentUserId = u && u.id);
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.restaurantId = options.data.restaurantId;
    this.restaurantService.getRestaurant(this.restaurantId).subscribe(data => {
      this.managerId = data['managerId'];
      this.menu = data['menu'];
    });
  }

  uploaded(event) {
    this.image = event.imagePath;
  }

}
