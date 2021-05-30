import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { MealService } from '../../../../../../shared/services/meal.service';
import { RestaurantService } from '../../../../../../shared/services/restaurant.service';

declare function mealsIsotopeInit(): void;

@Component({
  selector: 'app-meal-create-dialog',
  templateUrl: './create.component.html',
})
export class MealCreateDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private name: string;
  private description: string;
  private price: number;
  private menuTag: string = null;
  private restaurantId: number;
  private managerId: string;
  private currentUserId: string;
  private menu;

  constructor(private toastr: ToastrService, private authorizeService: AuthorizationService, private restaurantService: RestaurantService, private mealService: MealService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Add', onAction: () => {
          if (!this.name || !this.name.length) {
            this.toastr.error('Please enter meal name.');
            return false;
          }
          if (!this.description || !this.description.length) {
            this.toastr.error('Please enter meal description.');
            return false;
          }
          if (!this.price || Number.isNaN(this.price)) {
            this.toastr.error('Please enter meal price.');
            return false;
          }
          if (!this.menuTag || !this.menuTag.length) {
            this.toastr.error('Please select meal menu tag.');
            return false;
          }
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue.');
            return false;
          }
          if (!this.managerId || this.currentUserId !== this.managerId) {
            this.toastr.error('You do not have permisssion to add this meal.');
            return false;
          }
          const meal = {
            name: this.name,
            description: this.description,
            price: this.price,
            menuTag: this.menuTag,
            restaurantId: this.restaurantId
          };

          console.log(meal);

          this.mealService.postMeal(meal).subscribe(
            result => {
              this.toastr.success('Meal was added successfully.');
              window.location.reload();
            },
            error => console.log(error)
          );
          return true;
        },
        buttonClass: 'btn-rounded bg-success'
      },
      { text: 'Close', onAction: () => true, buttonClass: 'btn-rounded' },
    ];
    this.authorizeService.getUser().subscribe(
      user => this.currentUserId = user && user['id'],
      error => console.log(error)
    );
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.restaurantId = options.data.restaurantId;
    this.restaurantService.getRestaurant(this.restaurantId).subscribe(
      restaurant => {
        this.managerId = restaurant['managerId'];
        this.menu = restaurant['menu'];
      },
      error => console.log(error)
    );
  }
}
