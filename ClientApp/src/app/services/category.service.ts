import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private MyClient:HttpClient) {}

  BaseUrl = 'https://localhost:44392/api/Categories';

  getCategories(){
    return this.MyClient.get(this.BaseUrl, {observe:"response"});
  }

  getCategoryt(id:Number){
    return this.MyClient.get(`${this.BaseUrl}/${id}`);
  }

  putCategory(id:Number, category:Category){
    return this.MyClient.post(`${this.BaseUrl}/${id}`,  category);
  }

  postCategory(category:Category){
    return this.MyClient.post(this.BaseUrl, category);
  }

  deleteCategory(id:Number){
    return this.MyClient.delete(`${this.BaseUrl}/${id}`);
  }
}
