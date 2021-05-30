import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { AuthorizationService } from '../../../../shared/authorization/authorization.service';
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
export class BranchComponent implements OnInit {
  @Input() restaurantId;

  private restaurantName;
  private branches;
  private currentUserId;
  private managerId;
  private isManager: boolean;

  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private restaurantService: RestaurantService, private branchService: BranchService, private authorizeService: AuthorizationService) {

  }

  ngOnInit() {
    if (this.restaurantId) {
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(
        restaurant => {
          this.restaurantName = restaurant['name'];
          this.branches = restaurant['branches'] as [] || [];
          this.managerId = restaurant['managerId'];
          this.authorizeService.getUser().subscribe(
            user => {
              this.currentUserId = user && user['id'];
              this.isManager = this.currentUserId === this.managerId;
            },
            error => console.log(error)
          )
        },
        error => console.log(error)
      );
    }
  }

  create() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Add New Branch',
      childComponent: BranchCreateDialogComponent,
      data: {
        restaurantId: this.restaurantId
      }
    });
  }

  delete(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Remove Branch',
      childComponent: BranchDeleteDialogComponent,
      data: {
        branchId: id
      }
    });
  }

  update(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Update Branch',
      childComponent: BranchUpdateDialogComponent,
      data: {
        branchId: id
      }
    });
  }

  showLocation(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      childComponent: BranchDetailsDialogComponent,
      title: 'Location',
      data: {
        branchId: id
      }
    });
  }
}
