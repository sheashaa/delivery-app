import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { MealService } from '../../../../shared/services/meal.service';
import { RestaurantService } from '../../../../shared/services/restaurant.service';
import { MealCreateDialogComponent } from './dialogs/create/create.component';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
})
export class MealComponent implements OnInit {
  @Input() restaurantId;
  private restaurantName;
  private menu = [];
  private filters = [];
  private targets = [];
  private meals;
  private filterPerMeal = [];

  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private restaurantService: RestaurantService, private mealService: MealService) {

  }

  ngOnInit() {
    if (this.restaurantId) {
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(data => {
        this.restaurantName = data['name'];
        this.menu = data['menu'];
        for (const item of this.menu) {
          const filter = 'filter-' + item;
          this.filters.push(filter);
          this.targets.push('.' + filter);
        }
        this.meals = data['meals'];
        for (const i in this.meals) {
          this.filterPerMeal[i] = 'filter-' + this.meals[i].menuTag;
        }
      });
    }
  }

  addNewMeal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Custom child component',
      childComponent: MealCreateDialogComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close',
        buttonClass: 'btn btn-warning'
      },
      data: {
        restaurantId: Math.random()
      }
    });

  }

  viewMealDetails(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Custom child component',
      childComponent: MealCreateDialogComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close',
        buttonClass: 'btn btn-warning'
      },
      data: {
        restaurantId: id
      }
    });
  }


}
