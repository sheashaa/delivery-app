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
  private waypoint: Array<Array<any>> = [];
  private phone: string;
  private restaurantId: number;
  private managerId: string;
  private currentUserId: string;

  private isLoaded: boolean;

  constructor(private toastr: ToastrService, private authorizeService: AuthorizationService, private restaurantService: RestaurantService, private branchService: BranchService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Update', onAction: () => {
          if (!this.governorate || !this.governorate.length) {
            this.toastr.error('Please enter branch governorate.');
            return false;
          }
          if (!this.city || !this.city.length) {
            this.toastr.error('Please enter branch city.');
            return false;
          }
          if (!this.street || !this.street.length) {
            this.toastr.error('Please enter branch street.');
            return false;
          }
          if (!this.phone || !this.phone.length) {
            this.toastr.error('Please enter branch phone.');
            return false;
          }
          if (!this.waypoint || !Array.isArray(this.waypoint) || this.waypoint.length != 1) {
            this.toastr.error('Please select branch location on map.');
            return false;
          }
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue.');
            return false;
          }
          if (!this.managerId || this.currentUserId !== this.managerId) {
            this.toastr.error('You do not have permission to edit this branch.');
            return false;
          }
          const branch = {
            id: this.branchId,
            governorate: this.governorate,
            city: this.city,
            street: this.street,
            phone: this.phone,
            latitude: this.waypoint[0][1],
            longitude: this.waypoint[0][0],
            restaurantId: this.restaurantId
          };

          console.log(branch);

          this.branchService.putBranch(this.branchId, branch).subscribe(
            result => {
              this.toastr.success('Branch was updated successfully');
              window.location.reload();
            },
            error => console.log(error)
          );
          return true;
        },
        buttonClass: 'btn-rounded bg-primary'
      },
      { text: 'Close', onAction: () => true, buttonClass: 'btn-rounded' },
    ];
    this.authorizeService.getUser().subscribe(
      user => this.currentUserId = user && user['id'],
      error => console.log(error)
    );
    this.isLoaded = false;
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.branchId = options.data.branchId;
    this.branchService.getBranch(this.branchId).subscribe(branch => {
      this.governorate = branch['governorate'];
      this.city = branch['city'];
      this.street = branch['street'];
      this.phone = branch['phone'];
      this.waypoint = [];
      this.waypoint.push([parseFloat(branch['longitude']), parseFloat(branch['latitude'])]);
      this.restaurantId = parseInt(branch['restaurantId']);
      this.managerId = branch['restaurant']['managerId'];
      this.isLoaded = true;
    });
  }

  setLocation(event) {
    this.waypoint = [];
    this.waypoint.push([event.longitude, event.latitude]);
  }
}
