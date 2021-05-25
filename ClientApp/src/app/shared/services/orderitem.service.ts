import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/OrderItems';

  getOrderItems() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getOrderItem(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putOrderItem(id, orderItem) {
    return this.http.put(`${this.baseUrl}/${id}`, orderItem);
  }

  postOrderItem(orderItem) {
    return this.http.post(this.baseUrl, orderItem);
  }

  deleteOrderItem(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
