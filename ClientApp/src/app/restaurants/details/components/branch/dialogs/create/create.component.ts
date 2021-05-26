import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../../../../shared/authorization/authorization.service';
import { MealService } from '../../../../../../shared/services/meal.service';
import { RestaurantService } from '../../../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-branch-create-dialog',
  templateUrl: './create.component.html',
})
export class BranchCreateDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private name: string;
  private description: string;
  private price: number;
  private image: string;
  private menuTag: string;
  private restaurantId: number;
  private managerId: string;
  private currentUserId: string;
  private menu;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private restaurantService: RestaurantService, private mealService: MealService, private router: Router) {
    this.actionButtons = [
      { text: 'Add', onAction: () => true },
      { text: 'Close', onAction: () => true },
    ];
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {

  }


}
