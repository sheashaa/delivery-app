import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Restaurants';

  getRestaurants() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getRestaurant(id: Number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putRestaurant(id: Number, restaurant: Restaurant) {
    return this.http.post(`${this.baseUrl}/${id}`, restaurant);
  }

  postRestaurant(restaurant: Restaurant) {
    return this.http.post(this.baseUrl, restaurant);
  }

  deleteRestaurant(id: Number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
