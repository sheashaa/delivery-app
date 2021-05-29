import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { RestaurantDeleteDialogComponent } from './components/delete/delete.component';

@Component({
  selector: 'app-restaurants-details',
  templateUrl: './details.component.html',
})
export class RestaurantsDetailsComponent {
  private restaurantId;
  private restaurantName: string;
  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private route: ActivatedRoute, private router: Router, private restaurantService: RestaurantService) {
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(restaurant => {
        this.restaurantName = restaurant['name'];
      });
    });
  }

  editRestaurant() {
    this.router.navigate(['./restaurants/update/', this.restaurantId]);
  }

  removeRestaurant() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Remove Restaurant',
      childComponent: RestaurantDeleteDialogComponent,
      settings: {
        buttonClass: 'btn btn-warning',
      },
      data: {
        restaurantId: this.restaurantId
      }
    });
  }
  
}
