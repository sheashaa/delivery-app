import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../models/delivery.model';


@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Deliveries';

  getDeliveries() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getDelivery(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putDelivery(id: number, delivery: Delivery) {
    return this.http.post(`${this.baseUrl}/${id}`, delivery);
  }

  postDelivery(delivery: Delivery) {
    return this.http.post(this.baseUrl, delivery);
  }

  deleteDelivery(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
