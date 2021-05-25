import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants-details',
  templateUrl: './details.component.html',
})
export class RestaurantsDetailsComponent {
  private restaurantId;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
    });
  }
  
}
