import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { BranchService } from '../../../../../../shared/services/branch.service';

@Component({
  selector: 'app-branch-delete-dialog',
  templateUrl: './delete.component.html',
})
export class BranchDeleteDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private branchId: number;
  private branchCity: string;
  private managerId: string;
  private currentUserId: string;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private branchService: BranchService, private router: Router) {
    this.actionButtons = [
      {
        text: 'Remove', onAction: () => {
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue.');
            return false;
          }
          if (!this.managerId || this.currentUserId !== this.managerId) {
            this.toastr.error('You do not have permisssion to delete this branch.');
            return false;
          }
          this.branchService.deleteBranch(this.branchId).subscribe(
            result => {
              this.toastr.success('Branch was removed successfully.');
              window.location.reload();
            },
            error => console.log(error)
          );
          return true;
        },
        buttonClass: 'btn-rounded bg-danger'
      },
      { text: 'Close', onAction: () => true, buttonClass: 'btn-rounded' },
    ];
    this.authorize.getUser().subscribe(
      user => this.currentUserId = user && user['id']
    );
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.branchId = options.data.branchId;
    this.branchService.getBranch(this.branchId).subscribe(branch => {
      this.branchCity = branch['city'];
      this.managerId = branch['restaurant']['managerId'];
    });
  }
}
