import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { DeliveryListComponent } from './list/list.component';
import { CurrentDeliveryComponent } from './current/current.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'delivery', component: DeliveryListComponent },
      { path: 'delivery/current', component: CurrentDeliveryComponent },
    ]),
    SharedModule,
  ],
  declarations: [
    DeliveryListComponent,
    CurrentDeliveryComponent
  ],
  entryComponents: [
  ],
  exports: [
    RouterModule
  ]
})
export class DeliveryModule { }
