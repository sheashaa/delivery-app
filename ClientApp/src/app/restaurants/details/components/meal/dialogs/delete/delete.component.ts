import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { MealService } from '../../../../../../shared/services/meal.service';
import { RestaurantService } from '../../../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-meal-delete-dialog',
  templateUrl: './delete.component.html',
})
export class MealDeleteDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private mealId: number;
  private mealName: string;
  private restaurantId: number;
  private managerId: string;
  private currentUserId: string;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private restaurantService: RestaurantService, private mealService: MealService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Remove', onAction: () => {
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue', 'error');
            return true;
          }
          if (!this.managerId || this.currentUserId !== this.managerId) {
            this.toastr.error('You do not have permisssion to delete this meal', 'error');
            return true;
          }
          this.mealService.deleteMeal(this.mealId).subscribe(data => {
            this.toastr.success('Meal was removed successfully', 'success');
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
      this.mealName = meal['name'];
      this.restaurantId = parseInt(meal['restaurantId']);
      this.managerId = meal['restaurant']['managerId'];
    });
  }
}
