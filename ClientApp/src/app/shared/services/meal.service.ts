import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Products';

  getMeals() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getMeal(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putMeal(id, meal) {
    return this.http.put(`${this.baseUrl}/${id}`, meal);
  }

  postMeal(meal) {
    return this.http.post(this.baseUrl, meal);
  }

  deleteMeal(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
