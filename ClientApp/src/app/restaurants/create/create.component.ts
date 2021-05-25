import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-restaurants-create',
  templateUrl: './create.component.html',
})
export class RestaurantsCreateComponent {
  private name: string;
  private facebook: string;
  private twitter: string;
  private instagram: string;
  private image: string;
  private _tags;
  private _menu;
  private managerId;

  constructor(private toastr: ToastrService, private authorize: AuthorizationService, private restaurantService: RestaurantService, private router: Router) {
    this.authorize.getUser().subscribe(data => this.managerId = data.id);
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

  submit() {
    if (!this.name || !this.name.length) {
      this.toastr.error('Please enter restaurant name', 'error');
      return;
    }
    if (!this.managerId) {
      this.toastr.error('Please log in to continue', 'error');
      return;
    }
    //console.log(this.managerId);
    //console.log(this.facebook);
    //console.log(this.twitter);
    //console.log(this.instagram);
    //console.log(this.image);
    //console.log(this.tags);
    //console.log(this.menu);
    const restaurant = {
      name: this.name,
      facebookLink: this.facebook,
      twitterLink: this.twitter,
      instagramLink: this.instagram,
      image: this.image,
      tags: this.tags || [],
      menu: this.menu || [],
      managerId: this.managerId
    };

    console.log(restaurant);

    this.restaurantService.postRestaurant(restaurant).subscribe(data => {
      console.log(data);
      this.toastr.success('Restaurant was added successfully', 'success');
      this.router.navigate(['./restaurants']);
    });
  }
}
