import { Component, Input } from '@angular/core';
import { BranchService } from '../../../../shared/services/branch.service';
import { RestaurantService } from '../../../../shared/services/restaurant.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
})
export class BranchComponent {
  @Input() restaurantId;
  private restaurantName;


  constructor(private restaurantService: RestaurantService, private branchService: BranchService) {

  }

  ngOnInit() {
    if (this.restaurantId) {
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(data => {
        this.restaurantName = data['name'];
      });
    }
  }
}
