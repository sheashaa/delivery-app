import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Orders';

  getOrders() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getOrder(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putOrder(id: number, order: Order) {
    return this.http.post(`${this.baseUrl}/${id}`, order);
  }

  postOrder(order: Order) {
    return this.http.post(this.baseUrl, order);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
