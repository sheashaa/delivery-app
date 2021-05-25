import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-restaurants-update',
  templateUrl: './update.component.html',
})
export class RestaurantsUpdateComponent {
  private id;
  private name: string;
  private facebook: string;
  private twitter: string;
  private instagram: string;
  private image: string;
  private _tags = [];
  private _menu = [];
  private managerId;
  private currentUserId;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private authorize: AuthorizationService, private restaurantService: RestaurantService, private router: Router) {
    this.authorize.getUser().subscribe(data => this.currentUserId = data.id);
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.restaurantService.getRestaurant(this.id).subscribe(data => {
        console.log(data);
        this.name = data['name'];
        this.facebook = data['facebookLink'];
        this.twitter = data['twitterLink'];
        this.instagram = data['instagramLink'];
        this.image = data['image'];
        this.tags = data['tags'];
        this.menu = data['menu'];
        this.managerId = data['managerId'];
      });
    });
  }

  get tags(): string[] {
    return this._tags && this._tags.map(t => t.name);
  }

  set tags(tags: string[]) {
    tags.forEach(tag => this._tags.push({ id: tag, name: tag }));
  }

  get menu(): string[] {
    return this._menu && this._menu.map(m => m.name);
  }

  set menu(menu: string[]) {
    menu.forEach(item => this._menu.push({ id: item, name: item }));
  }

  uploaded(event) {
    this.image = event.imagePath;
  }

  submit() {
    if (!this.name || !this.name.length) {
      this.toastr.error('Please enter restaurant name', 'error');
      return;
    }
    if (!this.managerId || this.managerId !== this.currentUserId) {
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
      id: this.id,
      name: this.name,
      facebookLink: this.facebook,
      twitterLink: this.twitter,
      instagramLink: this.instagram,
      image: this.image,
      tags: this.tags || [],
      menu: this.menu || [],
      managerId: this.managerId,
    };

    console.log(restaurant);

    this.restaurantService.putRestaurant(this.id, restaurant).subscribe(data => {
      console.log(data);
      this.toastr.success('Restaurant was updated successfully', 'success');
      this.router.navigate(['./restaurants']);
    });
  }
}
