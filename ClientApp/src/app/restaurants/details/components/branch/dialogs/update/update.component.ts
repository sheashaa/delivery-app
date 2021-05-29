import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { BranchService } from '../../../../../../shared/services/branch.service';
import { RestaurantService } from '../../../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-branch-update-dialog',
  templateUrl: './update.component.html',
})
export class BranchUpdateDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private branchId: number;
  private governorate: string;
  private city: string;
  private street: string;
  private latitude: number;
  private longitude: number;
  private phone: string;
  private restaurantId: number;
  private managerId: string;
  private currentUserId: string;

  private isLoaded: boolean;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private restaurantService: RestaurantService, private branchService: BranchService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Update', onAction: () => {
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
            id: this.branchId,
            governorate: this.governorate,
            city: this.city,
            street: this.street,
            phone: this.phone,
            latitude: this.latitude,
            longitude: this.longitude,
            restaurantId: this.restaurantId
          };

          console.log(branch);

          this.branchService.putBranch(this.branchId, branch).subscribe(data => {
            console.log(data);
            this.toastr.success('Branch was updated successfully', 'success');
            window.location.reload();
          });
          return true;
        }
      },
      { text: 'Close', onAction: () => true },
    ];
    this.authorize.getUser().subscribe(u => this.currentUserId = u && u.id);
    this.isLoaded = false;
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.branchId = options.data.branchId;
    this.branchService.getBranch(this.branchId).subscribe(branch => {
      this.governorate = branch['governorate'];
      this.city = branch['city'];
      this.street = branch['street'];
      this.phone = branch['phone'];
      this.longitude = parseFloat(branch['longitude']);
      this.latitude = parseFloat(branch['latitude']);
      this.restaurantId = parseInt(branch['restaurantId']);
      this.managerId = branch['restaurant']['managerId'];
      this.isLoaded = true;
    });
  }

  setLocation(event) {
    this.longitude = event.longitude;
    this.latitude = event.latitude;
  }

}
