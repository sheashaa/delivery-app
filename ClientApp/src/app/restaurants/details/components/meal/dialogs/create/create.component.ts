import { Component, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';

@Component({
  selector: 'app-meal-create-dialog',
  templateUrl: './create.component.html',
})
export class MealCreateDialogComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];
  private restaurantId;

  constructor() {
    this.actionButtons = [
      { text: 'Close' }, // no special processing here
      { text: 'I will always close', onAction: () => true },
      { text: 'I never close', onAction: () => false }
    ];
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.restaurantId = options.data.restaurantId;
  }
}
