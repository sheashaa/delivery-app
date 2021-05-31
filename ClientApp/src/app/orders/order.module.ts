import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { OrdersListComponent } from './list/list.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderCancelComponent } from './cancel/cancel.component';
import { OrdersDetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/details/:id', component: OrdersDetailsComponent },
      { path: 'orders/cart', component: CartComponent },
    ]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    OrdersListComponent,
    CartComponent,
    AddressComponent,
    OrderCancelComponent,
    OrdersDetailsComponent
  ],
  entryComponents: [
    AddressComponent,
    OrderCancelComponent
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersModule { }
