import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Orders';

  getOrders() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getOrder(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putOrder(id, order) {
    return this.http.put(`${this.baseUrl}/${id}`, order);
  }

  postOrder(order) {
    return this.http.post(this.baseUrl, order);
  }

  deleteOrder(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
