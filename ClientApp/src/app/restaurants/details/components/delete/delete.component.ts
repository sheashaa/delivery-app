import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../shared/authorization/authorization.service';
import { RestaurantService } from '../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-restaurant-delete-dialog',
  templateUrl: './delete.component.html',
})
export class RestaurantDeleteDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private restaurantId: number;
  private restaurantName: string;
  private managerId: string;
  private currentUserId: string;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private restaurantService: RestaurantService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Remove', onAction: () => {
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue', 'error');
            return true;
          }
          if (!this.managerId || this.currentUserId !== this.managerId) {
            this.toastr.error('You do not have permisssion to delete this restaurant', 'error');
            return true;
          }
          this.restaurantService.deleteRestaurant(this.restaurantId).subscribe(data => {
            this.toastr.success('Restaurant was removed successfully', 'success');
            this.router.navigate(['./restaurants']);
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
    this.restaurantService.getRestaurant(this.restaurantId).subscribe(restaurant => {
      this.restaurantName = restaurant['name'];
      this.managerId = restaurant['managerId'];
    });
  }
}
