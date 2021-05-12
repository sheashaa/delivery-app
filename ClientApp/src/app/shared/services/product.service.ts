import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Products';

  getProducts() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getProduct(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putProduct(id: number, product: Product) {
    return this.http.post(`${this.baseUrl}/${id}`, product);
  }

  postProduct(product: Product) {
    return this.http.post(this.baseUrl, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
