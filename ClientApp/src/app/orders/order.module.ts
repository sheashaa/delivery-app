import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { OrdersListComponent } from './list/list.component';
import { OrdersDetailsComponent } from './list/dialogs/details/details.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/cart', component: CartComponent },
    ]),
    SharedModule,
  ],
  declarations: [
    OrdersListComponent,
    OrdersDetailsComponent,
    CartComponent
  ],
  entryComponents: [
    OrdersDetailsComponent
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersModule { }
