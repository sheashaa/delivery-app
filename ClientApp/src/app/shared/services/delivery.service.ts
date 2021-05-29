import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Deliveries';

  getDeliveries() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getDelivery(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putDelivery(id, delivery) {
    return this.http.put(`${this.baseUrl}/${id}`, delivery);
  }

  postDelivery(delivery) {
    return this.http.post(this.baseUrl, delivery);
  }

  deleteDelivery(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
