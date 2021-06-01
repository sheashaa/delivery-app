import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { AuthorizationService } from '../../../../shared/authorization/authorization.service';
import { MealService } from '../../../../shared/services/meal.service';
import { RestaurantService } from '../../../../shared/services/restaurant.service';
import { MealCreateDialogComponent } from './dialogs/create/create.component';
import { MealDeleteDialogComponent } from './dialogs/delete/delete.component';
import { MealDetailsDialogComponent } from './dialogs/details/details.component';
import { MealUpdateDialogComponent } from './dialogs/update/update.component';

declare function initMealsAnimationScript(): any;

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  @Input() restaurantId;
  private restaurantName;
  private menu = [];
  private filters = [];
  private filterPerMeal = [];
  private meals;
  private currentUserId;
  private managerId;
  private isManager: boolean;

  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private restaurantService: RestaurantService, private mealService: MealService, private authorizeService: AuthorizationService) {

  }

  ngOnInit() {
    if (this.restaurantId) {
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(
        restaurant => {
          this.restaurantName = restaurant['name'];
          this.meals = restaurant['meals'];
          this.filters = [];
          for (const i in this.meals) {
            const hashedTag = this.hash(this.meals[i].menuTag);
            const mealFilter = 'filter-' + hashedTag;
            const filter = '.' + mealFilter;
            this.filterPerMeal[i] = mealFilter;
            if (!this.menu.includes(this.meals[i].menuTag)) {
              this.filters.push(filter);
              this.menu.push(this.meals[i].menuTag);
            }
          }
          initMealsAnimationScript();
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

  hash(str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  }

  create() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Add New Meal',
      childComponent: MealCreateDialogComponent,
      data: {
        restaurantId: this.restaurantId
      }
    });
  }

  showDetails(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Meal Information',
      childComponent: MealDetailsDialogComponent,
      data: {
        mealId: id,
        currentUserId: this.currentUserId,
        managerId: this.managerId,
        restaurantId: this.restaurantId
      }
    });
  }

  delete(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Remove Meal',
      childComponent: MealDeleteDialogComponent,
      data: {
        mealId: id
      }
    });
  }

  update(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Update Meal',
      childComponent: MealUpdateDialogComponent,
      data: {
        mealId: id
      }
    });
  }
}
