import { Component, Input, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { BranchService } from '../../../../shared/services/branch.service';
import { RestaurantService } from '../../../../shared/services/restaurant.service';
import { BranchCreateDialogComponent } from './dialogs/create/create.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
})
export class BranchComponent {
  @Input() restaurantId;
  private restaurantName;


  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private restaurantService: RestaurantService, private branchService: BranchService) {

  }

  ngOnInit() {
    if (this.restaurantId) {
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(data => {
        this.restaurantName = data['name'];
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
      }
    });
  }
}
