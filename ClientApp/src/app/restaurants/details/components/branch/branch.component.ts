import { Component, Input, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { BranchService } from '../../../../shared/services/branch.service';
import { RestaurantService } from '../../../../shared/services/restaurant.service';
import { BranchCreateDialogComponent } from './dialogs/create/create.component';
import { BranchDeleteDialogComponent } from './dialogs/delete/delete.component';
import { BranchDetailsDialogComponent } from './dialogs/details/details.component';
import { BranchUpdateDialogComponent } from './dialogs/update/update.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
})
export class BranchComponent {
  @Input() restaurantId;
  private restaurantName;

  private branches;

  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private restaurantService: RestaurantService, private branchService: BranchService) {

  }

  ngOnInit() {
    if (this.restaurantId) {
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(data => {
        this.restaurantName = data['name'];
        this.branches = data['branches'];
        console.log(this.branches);
      });
    }
  }

  addNewBranch() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Add New Branch',
      childComponent: BranchCreateDialogComponent,
      settings: {
        buttonClass: 'btn btn-warning',
      },
      data: {
        restaurantId: this.restaurantId
      }
    });
  }

  deleteBranch(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Remove Branch',
      childComponent: BranchDeleteDialogComponent,
      settings: {
        buttonClass: 'btn btn-warning',
      },
      data: {
        branchId: id
      }
    });

   
  }

  editBranch(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Edit Branch',
      childComponent: BranchUpdateDialogComponent,
      settings: {
        buttonClass: 'btn btn-warning',
      },
      data: {
        branchId: id
      }
    });
  }

  showBranchLocation(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      childComponent: BranchDetailsDialogComponent,
      settings: {
        buttonClass: 'btn btn-warning',
      },
      data: {
        branchId: id
      }
    });
  }
}
