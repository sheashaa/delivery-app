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
import { MealComponent } from './details/components/meal/meal.component';
import { BranchComponent } from './details/components/branch/branch.component';
import { MealCreateDialogComponent } from './details/components/meal/dialogs/create/create.component';
import { MealDeleteDialogComponent } from './details/components/meal/dialogs/delete/delete.component';
import { MealDetailsDialogComponent } from './details/components/meal/dialogs/details/details.component';
import { MealUpdateDialogComponent } from './details/components/meal/dialogs/update/update.component';
import { BranchCreateDialogComponent } from './details/components/branch/dialogs/create/create.component';
import { BranchDeleteDialogComponent } from './details/components/branch/dialogs/delete/delete.component';
import { BranchDetailsDialogComponent } from './details/components/branch/dialogs/details/details.component';
import { BranchUpdateDialogComponent } from './details/components/branch/dialogs/update/update.component';

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
    RestaurantsUpdateComponent,
    MealComponent,
    BranchComponent,
    MealCreateDialogComponent,
    MealDeleteDialogComponent,
    MealDetailsDialogComponent,
    MealUpdateDialogComponent,
    BranchCreateDialogComponent,
    BranchDeleteDialogComponent,
    BranchDetailsDialogComponent,
    BranchUpdateDialogComponent
  ],
  entryComponents: [
    MealCreateDialogComponent,
    MealDeleteDialogComponent,
    MealDetailsDialogComponent,
    MealUpdateDialogComponent,
    BranchCreateDialogComponent,
    BranchDeleteDialogComponent,
    BranchDetailsDialogComponent,
    BranchUpdateDialogComponent
  ],
  exports: [
    RouterModule
  ]
})
export class RestaurantsModule { }
