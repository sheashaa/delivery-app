import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './list.component.html',
})
export class RestaurantsListComponent  {
  private restaurants;

  constructor(private restaurantService: RestaurantService, private router: Router) {
    this.restaurantService.getRestaurants().subscribe(data => this.restaurants = data.body);
  }

  update(id) {
    this.router.navigate(['./restaurants/update', id]);
  }

}
