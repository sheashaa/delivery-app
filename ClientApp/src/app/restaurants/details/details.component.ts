import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { RestaurantDeleteDialogComponent } from './components/delete/delete.component';

@Component({
  selector: 'app-restaurants-details',
  templateUrl: './details.component.html',
})
export class RestaurantsDetailsComponent {
  private restaurantId;
  private restaurantName: string;
  private currentUserId;
  private managerId;
  private isManager: boolean;

  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef, private route: ActivatedRoute, private router: Router, private restaurantService: RestaurantService, private authorizeService: AuthorizationService) {

    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(
        restaurant => {
          this.restaurantName = restaurant['name'];
          this.managerId = restaurant['managerId'];
          this.authorizeService.getUser().subscribe(
            user => {
              this.currentUserId = user && user['id']
              this.isManager = this.managerId === this.currentUserId;
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      );
    });
  }

  edit() {
    this.router.navigate(['./restaurants/update/', this.restaurantId]);
  }

  delete() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Remove Restaurant',
      childComponent: RestaurantDeleteDialogComponent,
      settings: {
        buttonClass: 'btn-rounded',
      },
      data: {
        restaurantId: this.restaurantId
      }
    });
  }
}
