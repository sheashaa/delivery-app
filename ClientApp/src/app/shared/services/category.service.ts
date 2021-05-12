import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Categories';

  getCategories() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getCategory(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putCategory(id: number, category: Category) {
    return this.http.post(`${this.baseUrl}/${id}`, category);
  }

  postCategory(category: Category) {
    return this.http.post(this.baseUrl, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
