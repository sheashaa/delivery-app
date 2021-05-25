import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RestaurantsListComponent } from './list/list.component';
import { RestaurantsDetailsComponent } from './details/details.component';
import { RestaurantsCreateComponent } from './create/create.component';
import { RestaurantsUpdateComponent } from './update/update.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'restaurants', component: RestaurantsListComponent},
      { path: 'restaurants/details/:id', component: RestaurantsDetailsComponent },
      { path: 'restaurants/create', component: RestaurantsCreateComponent },
      { path: 'restaurants/update/:id', component: RestaurantsUpdateComponent },
    ]),
    SharedModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RestaurantsListComponent,
    RestaurantsDetailsComponent,
    RestaurantsCreateComponent,
    RestaurantsUpdateComponent
  ],
  exports: [
    RouterModule
  ]
})
export class RestaurantsModule { }
