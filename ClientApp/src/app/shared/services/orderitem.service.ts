import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItem } from '../models/orderitem.model';


@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/OrderItems';

  getOrderItems() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getOrderItem(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putOrderItem(id: number, orderItem: OrderItem) {
    return this.http.post(`${this.baseUrl}/${id}`, orderItem);
  }

  postOrderItem(orderItem: OrderItem) {
    return this.http.post(this.baseUrl, orderItem);
  }

  deleteOrderItem(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
