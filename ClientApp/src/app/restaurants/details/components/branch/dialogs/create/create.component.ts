import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { BranchService } from '../../../../../../shared/services/branch.service';
import { RestaurantService } from '../../../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-branch-create-dialog',
  templateUrl: './create.component.html',
})
export class BranchCreateDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private governorate: string;
  private city: string;
  private street: string;
  private latitude: number;
  private longitude: number;
  private phone: string;
  private restaurantId: number;
  private managerId: string;
  private currentUserId: string;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private restaurantService: RestaurantService, private branchService: BranchService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Add', onAction: () => {
          if (!this.governorate || !this.governorate.length) {
            this.toastr.error('Please enter branch governorate', 'error');
            //return true;
            return false;
          }
          if (!this.city || !this.city.length) {
            this.toastr.error('Please enter branch city', 'error');
            //return true;
            return false;
          }
          if (!this.street || !this.street.length) {
            this.toastr.error('Please enter branch street', 'error');
            //return true;
            return false;
          }
          if (!this.phone || !this.phone.length) {
            this.toastr.error('Please enter branch phone', 'error');
            //return true;
            return false;
          }
          if (!this.longitude || !this.latitude) {
            this.toastr.error('Please select branch location on map', 'error');
            //return true;
            return false;
          }
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue', 'error');
            //return true;
            return false;
          }
          if (!this.managerId || this.currentUserId !== this.managerId) {
            this.toastr.error('You do not have permisssion to add this meal', 'error');
            //return true;
            return false;
          }
          const branch = {
            governorate: this.governorate,
            city: this.city,
            street: this.street,
            phone: this.phone,
            latitude: this.latitude,
            longitude: this.longitude,
            restaurantId: this.restaurantId
          };

          console.log(branch);

          this.branchService.postBranch(branch).subscribe(data => {
            console.log(data);
            this.toastr.success('Meal was added successfully', 'success');
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
    this.restaurantId = options.data.restaurantId;
    this.restaurantService.getRestaurant(this.restaurantId).subscribe(data => {
      this.managerId = data['managerId'];
    });
  }

  setLocation(event) {
    this.longitude = event.longitude;
    this.latitude = event.latitude;
  }

}
