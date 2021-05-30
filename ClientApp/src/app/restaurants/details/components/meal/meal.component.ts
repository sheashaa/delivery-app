import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { AuthorizationService } from '../../../../shared/authorization/authorization.service';
import { MealService } from '../../../../shared/services/meal.service';
import { RestaurantService } from '../../../../shared/services/restaurant.service';
import { MealCreateDialogComponent } from './dialogs/create/create.component';
import { MealDetailsDialogComponent } from './dialogs/details/details.component';

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
  private targets = [];
  private meals;
  private filterPerMeal = [];
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
          this.menu = restaurant['menu'];
          for (const item of this.menu) {
            const filter = 'filter-' + item;
            this.filters.push(filter);
            this.targets.push('.' + filter);
          }
          this.meals = restaurant['meals'];
          for (const i in this.meals) {
            this.filterPerMeal[i] = 'filter-' + this.meals[i].menuTag;
          }

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

  create() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Add New Meal',
      childComponent: MealCreateDialogComponent,
      settings: {
        buttonClass: 'btn-rounded',
      },
      data: {
        restaurantId: this.restaurantId
      }
    });
  }

  showDetails(id) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Meal Information',
      childComponent: MealDetailsDialogComponent,
      settings: {
        buttonClass: 'btn-rounded',
      },
      data: {
        mealId: id
      }
    });
  }

  refresh() {
      //var menuIsotope = $('.menu-container').isotope({
      //  itemSelector: '.menu-item',
      //  layoutMode: 'fitRows'
      //});

      //$('#menu-flters li').on('click', function () {
      //  $("#menu-flters li").removeClass('filter-active');
      //  $(this).addClass('filter-active');

      //  menuIsotope.isotope({
      //    filter: $(this).data('filter')
      //  });
      //});
    
  }
}
