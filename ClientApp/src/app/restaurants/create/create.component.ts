import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-restaurants-create',
  templateUrl: './create.component.html'
})
export class RestaurantsCreateComponent {
  private name: string;
  private facebook: string;
  private twitter: string;
  private instagram: string;
  private image: string;
  private _tags;
  private _menu;
  //private currentUserRole;
  private currentUserId;

  constructor(private toastr: ToastrService, private authorizeService: AuthorizationService, private restaurantService: RestaurantService, private router: Router) {
    this.authorizeService.getUser().subscribe(
      user => {
        //this.currentUserRole = user && user['role'];
        this.currentUserId = user && user['id'];
      },
      error => console.log(error)
    );
  }

  get tags(): string[] {
    return this._tags && this._tags.map(t => t.name);
  }

  get menu(): string[] {
    return this._menu && this._menu.map(m => m.name);
  }

  uploaded(event) {
    this.image = event.imagePath;
  }

  create() {
    if (!this.name || !this.name.length) {
      this.toastr.error('Please enter restaurant name.');
      return;
    }
    if (!this.currentUserId) {
      this.toastr.error('Please log in to continue.');
      return;
    }
    //if (!this.currentUserRole || this.currentUserRole !== 'Manager') {
    //  this.toastr.error('You do not have permisssion to create a restaurant. Create manager account to continue.');
    //  return;
    //}
    const restaurant = {
      name: this.name,
      facebookLink: this.facebook,
      twitterLink: this.twitter,
      instagramLink: this.instagram,
      image: this.image,
      tags: this.tags || [],
      menu: this.menu || [],
      managerId: this.currentUserId
    };

    console.log(restaurant);

    this.restaurantService.postRestaurant(restaurant).subscribe(
      result => {
        console.log(result);
        this.toastr.success('Restaurant was added successfully.');
        this.router.navigate(['./restaurants']);
      },
      error => {
        this.toastr.error('Failed to add restaurant. Try again later.');
        console.log(error);
      }
    );
  }
}
