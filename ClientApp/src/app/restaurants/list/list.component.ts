import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RestaurantsListComponent  {
  private restaurants = [];

  constructor(private restaurantService: RestaurantService, private router: Router) {
    this.restaurantService.getRestaurants().subscribe(
      restaurants => {
        this.restaurants = restaurants.body as [] || [];
      },
      error => console.log(error)
    );
  }

  updateRestaurant(id) {
    this.router.navigate(['./restaurants/update', id]);
  }

}
