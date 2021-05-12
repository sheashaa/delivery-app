import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private MyClient:HttpClient) {}

  BaseUrl = 'https://localhost:44392/api/Products';

  getProducts(){
    return this.MyClient.get(this.BaseUrl, {observe:"response"});
  }

  getProduct(id:Number){
    return this.MyClient.get(`${this.BaseUrl}/${id}`);
  }

  putProduct(id:Number, product:Product){
    return this.MyClient.post(`${this.BaseUrl}/${id}`,  product);
  }

  postProduct(product:Product){
    return this.MyClient.post(this.BaseUrl, product);
  }

  deleteProduct(id:Number){
    return this.MyClient.delete(`${this.BaseUrl}/${id}`);
  }
}
