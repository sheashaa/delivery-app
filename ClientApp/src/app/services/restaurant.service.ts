import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../shared/models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private MyClient:HttpClient) {}

  BaseUrl = 'https://localhost:44392/api/Restaurants';

  getRestaurants(){
    return this.MyClient.get(this.BaseUrl, {observe:"response"});
  }

  getRestaurant(id:Number){
    return this.MyClient.get(`${this.BaseUrl}/${id}`);
  }

  putRestaurant(id:Number, restaurant:Restaurant){
    return this.MyClient.post(`${this.BaseUrl}/${id}`,  restaurant);
  }

  postRestaurant(restaurant:Restaurant){
    return this.MyClient.post(this.BaseUrl, restaurant);
  }

  deleteRestaurant(id:Number){
    return this.MyClient.delete(`${this.BaseUrl}/${id}`);
  }
}
