import { Component, ComponentRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { BranchService } from '../../../../../../shared/services/branch.service';
import { MealService } from '../../../../../../shared/services/meal.service';
import { RestaurantService } from '../../../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-branch-details-dialog',
  templateUrl: './details.component.html',
})
export class BranchDetailsDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private branchId: number;
  private latitude: number;
  private longitude: number;

  private isLoaded: boolean;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private branchService: BranchService, private router: Router) {
    this.actionButtons = [
      { text: 'Close', onAction: () => true, buttonClass: 'btn-rounded' },
    ];
    this.isLoaded = false;
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.branchId = options.data.branchId;
    this.branchService.getBranch(this.branchId).subscribe(branch => {
      this.latitude = parseFloat(branch['latitude']);
      this.longitude = parseFloat(branch['longitude']);
      this.isLoaded = true;
    });
  }
}
