import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Restaurants';

  getRestaurants() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getRestaurant(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putRestaurant(id, restaurant) {
    return this.http.put(`${this.baseUrl}/${id}`, restaurant);
  }

  postRestaurant(restaurant) {
    return this.http.post(this.baseUrl, restaurant);
  }

  deleteRestaurant(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
