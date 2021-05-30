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

  constructor(
    private authorizeService: AuthorizationService,
    private restaurantService: RestaurantService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
    this.authorizeService.getUser().subscribe(
      user => this.currentUserId = user && user['id'],
      error => console.log(error)
    );
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.restaurantService.getRestaurant(this.id).subscribe(
        restaurant => {
          console.log(restaurant);
          this.name = restaurant['name'];
          this.facebook = restaurant['facebookLink'];
          this.twitter = restaurant['twitterLink'];
          this.instagram = restaurant['instagramLink'];
          this.image = restaurant['image'];
          this.tags = restaurant['tags'];
          this.menu = restaurant['menu'];
          this.managerId = restaurant['managerId'];
        },
        error => console.log(error)
      );
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

  update() {
    if (!this.name || !this.name.length) {
      this.toastr.error('Please enter restaurant name.');
      return;
    }
    if (!this.currentUserId) {
      this.toastr.error('Please log in to continue.');
      return;
    }
    if (!this.managerId || this.managerId !== this.currentUserId) {
      this.toastr.error('You do not have permission to edit this restaurant.');
      return;
    }

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

    this.restaurantService.putRestaurant(this.id, restaurant).subscribe(
      result => {
        console.log(result);
        this.toastr.success('Restaurant was updated successfully');
        this.router.navigate(['./restaurants']);
      },
      error => console.log(error)
    );
  }
}
