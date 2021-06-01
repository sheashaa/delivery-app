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
  private filtered = [];
  private isManager: boolean;
  private tags: Set<any>;
  private searchText: string = "";
  private searchTags = {};


  constructor(private authorizeService: AuthorizationService, private restaurantService: RestaurantService, private router: Router) {
    this.authorizeService.getUser().subscribe(
      user => console.log(this.isManager = user && user['role'] === 'Manager'),
      error => console.log(error)
    );
    this.restaurantService.getRestaurants().subscribe(
      restaurants => {
        this.restaurants = restaurants.body as [] || [];
        this.filtered = this.restaurants;
        this.tags = new Set([].concat.apply([], this.restaurants.map(r => r['tags'])).map(tag => this.capitalize(tag)));
        console.log(this.tags);
        this.tags.forEach(value => {
          this.searchTags[value] = false;
        });
      },
      error => console.log(error)
    );
  }

  capitalize(str: string) {
    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  update(id) {
    this.router.navigate(['./restaurants/details', id]);
  }

  create() {
    this.router.navigate(['./restaurants/create']);
  }

  toggle(tag) {
    this.searchTags[tag] = !this.searchTags[tag];
    this.search();
  }

  isActive(tag) {
    return tag && this.searchTags[tag];
  }

  search() {
    const keywords = [...this.searchText.toLowerCase().split(' '), this.searchText.toLowerCase()];
    this.filtered = this.restaurants.filter(restaurant => {
      let foundByName = false;
      for (const keyword of keywords) {
        if (!keyword.length) continue;
        const i = (restaurant['name'] as string).toLowerCase().search(keyword);
        if (i > -1) {
          foundByName = true;
          console.log('wtf');
          break;
        }
      }

      const foundByTag = (restaurant['tags'] as Array<string>).filter(tag => this.searchTags[this.capitalize(tag)]).length > 0;
      console.log(foundByTag);
      return foundByName || foundByTag;
    });
  }

  clear() {
    this.searchText = "";
    for (const tag in this.searchTags) {
      this.searchTags[tag] = false;
    }
    this.filtered = this.restaurants;
  }
}
