import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RestaurantsListComponent {
  private restaurants = [];
  private isManager: boolean;

  constructor(private authorizeService: AuthorizationService, private restaurantService: RestaurantService, private router: Router) {
    this.authorizeService.getUser().subscribe(
      user => console.log(this.isManager = user && user['role'] === 'Manager'),
      error => console.log(error)
    );
    this.restaurantService.getRestaurants().subscribe(
      restaurants =>
        this.restaurants = restaurants.body as [] || [],
      error => console.log(error)
    );
  }

  update(id) {
    this.router.navigate(['./restaurants/details', id]);
  }

  create() {
    this.router.navigate(['./restaurants/create']);
  }
}
