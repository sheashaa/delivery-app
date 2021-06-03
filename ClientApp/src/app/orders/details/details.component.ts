import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { DeliveryService } from '../../shared/services/delivery.service';
import { MapService } from '../../shared/services/map.service';
import { OrderService } from '../../shared/services/order.service';
import { OrderItemService } from '../../shared/services/orderitem.service';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './details.component.html'
})
export class OrdersDetailsComponent {
  private orderId;
  private order;
  private currentUserId;
  private currentUserRole;
  private waypoints: Array<Array<any>> = [];
  private isLoaded: boolean = false;
  private isCourier: boolean;
  private isDelivering: boolean;
  private isDelivered: boolean;

  constructor(private mapService: MapService, private restaurantService: RestaurantService, private route: ActivatedRoute, private toastr: ToastrService, private orderService: OrderService, private authorizeService: AuthorizationService, private router: Router, private orderItemService: OrderItemService, private deliveryService: DeliveryService) {
    this.route.params.subscribe(
      params => {
        this.orderId = params['id'];
        this.orderService.getOrder(this.orderId).subscribe(
          order => {
            this.order = order;
            this.setMapWaypoints(order);
            console.log(this.order);
            this.authorizeService.getUser().subscribe(
              user => {
                this.currentUserId = user && user['id'];
                this.currentUserRole = user && user['role'];
                this.isCourier = this.currentUserRole == 'Courier';
                this.deliveryService.getDeliveries().subscribe(
                  _deliveries => {
                    const deliveries = _deliveries.body as [] || [];
                    const delivery = deliveries.filter(delivery => delivery['orderId'] == this.orderId && delivery['courierId'] == this.currentUserId);
                    this.isDelivering = delivery.length == 1 && delivery[0]['order']['status'] == 3;
                    this.isDelivered = delivery.length == 1 && delivery[0]['order']['status'] == 4;
                  }
                );
              },
              error => console.log(error)
            );
          }
        );
      }
    );
  }

  getDateTime(dateTime) {
    return new Date(Date.parse(dateTime)).toLocaleString();
  }


  getItemStatusClass(status) {
    switch (status) {
      case 0: return 'bg-primary';
      case 1: return 'bg-secondary';
      case 2: return 'bg-success';
      case 3: return 'bg-info';
    }
  }

  getOrderStatusClass(status) {
    switch (status) {
      case 0: return 'bg-primary';
      case 1: return 'bg-secondary';
      case 2: return 'bg-success';
      case 3: return 'bg-danger text-light';
      case 4: return 'bg-warning';
      case 5: return 'bg-info';
    }
  }

  getItemStatus(status) {
    switch (status) {
      case 0: return 'Queued';
      case 1: return 'Preparing';
      case 2: return 'Prepared';
      case 3: return 'Cancelled';
    }
  }

  getOrderStatus(status) {
    switch (status) {
      case 0: return 'Queued';
      case 1: return 'Preparing';
      case 2: return 'Prepared';
      case 3: return 'Delivering';
      case 4: return 'Delivered';
      case 5: return 'Cancelled';
    }
  }

  cancel(item) {
    this.orderService.getOrder(item['orderId']).subscribe(
      order => {
        if (order['status'] == 5) {
          this.toastr.error('Order has been cancelled');
        }
        else {
          item['status'] = 3;
          const itemIndex = (order['items'] as Array<any>).findIndex(_item => _item['id'] == item['id']);
          if (itemIndex >= 0) {
            order['items'][itemIndex]['status'] = 3;
          }
          console.log(order);
          if (this.isCancellable(order)) {
            order['status'] = 5;
          }
          else if (this.isDeliverable(order)) {
            order['status'] = 2;
          }

          this.orderItemService.putOrderItem(item['id'], item).subscribe(
            result => {
              this.orderService.putOrder(order['id'], order).subscribe(
                result => {
                  window.location.reload();
                },
                error => console.log(error)
              )
            },
            error => console.log(error)
          );
        }
      },
      error => console.log(error)
    );

  }

  getTotal() {
    let total = 0;
    for (const item of this.order['items']) {
      if (item['status'] > 0 && item['status'] < 3) total += item['quantity'] * item['price'];
    }
    return total;
  }

  isCancellable(order) {
    return (order['items'] as Array<any>).filter(item => item['status'] == 0 || item['status'] == 1 || item['status'] == 2).length == 0;
  }

  isDeliverable(order) {
    const all = (order['items'] as Array<any>).length;
    const prepared = (order['items'] as Array<any>).filter(item => item['status'] == 2).length;
    const queuedAndPreparing = (order['items'] as Array<any>).filter(item => item['status'] == 0 || item['status'] == 1).length;
    const cancelled = (order['items'] as Array<any>).filter(item => item['status'] == 3).length;
    const equal = all == (prepared + cancelled);
    return queuedAndPreparing == 0 && equal;
  }

  setMapWaypoints(order) {
    this.waypoints = [];
    this.restaurantService.getRestaurants().subscribe(
      _restaurants => {
        const restaurants = _restaurants.body as Array<any> || [];
        const customer = [order['longitude'], order['latitude']];
        console.log('customer: ' + customer);
        for (const item of order['items']) {
          const restaurant = restaurants.find(restaurant => restaurant['id'] == item['restaurantId']);
          if (!restaurant) { // this should NOT ever happen, otherwise it means something horrible happended
            this.toastr.error('Something horrible internally :(');
            return;
          } else {
            console.log(restaurant);
            const closest = this.getClosestBranch(restaurant['branches'], customer);
            if (!closest) {
              this.toastr.warning(`Please contact '${restaurant['name']}' to get to the closest branch.`);
            }
            else {
              this.waypoints.push(closest);
            }
          }
        }
        this.waypoints.push(customer);
        this.isLoaded = true;
        console.log(this.waypoints);
        console.log('isLoaded: ' + this.isLoaded);
      },
      error => console.log(error)
    );
  }

  getClosestBranch(branches, customer): [] {
    if (!branches || !branches.length) return null;
    let closest = null;
    let minDistance = Number.MAX_VALUE;
    for (const branch of branches) {
      const b = [branch['longitude'], branch['latitude']];
      const distance = this.getDistanceFromLatLonInKm(b, customer);
      if (distance <= minDistance) {
        closest = b;
        minDistance = distance;
      }
    }
    return closest;
  }

  getDistanceFromLatLonInKm(coord1, coord2) {
    const lon1 = coord1[0];
    const lat1 = coord1[1];
    const lon2 = coord2[0];
    const lat2 = coord2[1];
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  finished() {
    if (this.isDelivering) {
      this.order['status'] = 4;
      this.orderService.putOrder(this.orderId, this.order).subscribe(
        result => {
          this.toastr.success('Thank you for your work :D');
          this.router.navigate(['./orders']);
        },
        error => console.log(error)
      );
    } else {
      this.toastr.error('Something is not right.');
    }
    
  }
}
