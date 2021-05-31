import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, observable } from 'rxjs';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { BranchService } from '../../shared/services/branch.service';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { OrderItemService } from '../../shared/services/orderitem.service';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
})
export class AddressComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  private city: string;
  private streetName: string;
  private building: string;
  private floor: string;
  private apartment: string;
  private latitude: number;
  private longitude: number;
  private currentUserId: string;
  private isNewOrder: boolean;
  private orderId: number;
  private dateTime;
  private customerId;
  private orderStatus;

  constructor(private toastr: ToastrService, private authorizeService: AuthorizationService, private restaurantService: RestaurantService, private branchService: BranchService, private router: Router, private cart: CartService, private orderService: OrderService, private orderItemService: OrderItemService) {
    const address = this.cart.getAddress();
    if (address) {
      this.city = address.city;
      this.streetName = address.streetName;
      this.building = address.building;
      this.floor = address.floor;
      this.apartment = address.apartment;
      this.latitude = address.latitude;
      this.longitude = address.longitude;
    }
    this.actionButtons = [
      {
        text: 'Order', onAction: () => {
          if (!this.city || !this.city.length) {
            this.toastr.error('Please enter your city.');
            return false;
          }
          if (!this.streetName || !this.streetName.length) {
            this.toastr.error('Please enter your street name.');
            return false;
          }
          if (!this.building || !this.building.length) {
            this.toastr.error('Please enter your building.');
            return false;
          }
          if (!this.longitude || !this.latitude) {
            this.toastr.error('Please select your location on map.');
            return false;
          }
          if (!this.currentUserId) {
            this.toastr.error('Please log in to continue.');
            return false;
          }

          const address = {
            city: this.city,
            streetName: this.streetName,
            building: this.building,
            floor: this.floor,
            apartment: this.apartment,
            latitude: this.latitude,
            longitude: this.longitude
          };

          console.log(address);

          this.cart.setAddress(address);

          if (this.isNewOrder) {
            const cart = this.cart.get();
            if (!cart.length) {
              this.toastr.error('Cart is empty');
              return true;
            }

            const order = {
              city: address.city,
              streetName: address.streetName,
              building: address.building,
              floor: address.floor,
              apartment: address.apartment,
              latitude: address.latitude,
              longitude: address.longitude,
              customerId: this.currentUserId,
            };

            this.orderService.postOrder(order).subscribe(
              order => {
                this.orderId = order['id'];
                const observables: Array<Observable<any>> = [];
                for (const item of cart) {
                  const orderItem = {
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    discount: item.discount,
                    orderId: this.orderId,
                    mealId: item.mealId
                  };

                  observables.push(this.orderItemService.postOrderItem(orderItem));
                  //  error => {
                  //    console.log(error);
                  //    this.toastr.error('Could not complete your order.');
                  //    this.orderService.deleteOrder(this.orderId).subscribe(null,
                  //      error => console.log(error)
                  //    );
                  //    return;
                  //  }

                  //);
                }
                forkJoin(observables).subscribe(
                  result => {
                    this.toastr.success('Your order has been recorded.');
                    this.cart.clear();
                    this.router.navigate(['./orders']);
                  },
                  error => {
                    console.log(error);
                    this.toastr.error('Could not complete your order.');
                    this.orderService.deleteOrder(this.orderId).subscribe(null,
                      error => console.log(error)
                    );
                  }
                )
              },
              error => {
                console.log(error);
                this.toastr.error('Could not complete your order.');
                this.orderService.deleteOrder(this.orderId).subscribe(null,
                  error => console.log(error)
                );
              }
            );
          }
          else {
            this.orderService.getOrder(this.orderId).subscribe(
              order => {
                const updatedOrder = {
                  id: this.orderId,
                  dateTime: order['dateTime'],
                  city: this.city,
                  streetName: this.streetName,
                  building: this.building,
                  floor: this.floor,
                  apartment: this.apartment,
                  latitude: this.latitude,
                  longitude: this.longitude,
                  customerId: order['customerId'],
                  status: order['status']
                };
                this.orderService.putOrder(this.orderId, updatedOrder).subscribe(
                  result => {
                    this.toastr.success('Your adddress has been updated');
                    window.location.reload();
                  },
                  error => {
                    console.log(error);
                    this.toastr.error('Could not update your address');
                  }
                )

              },
              error => {
                console.log(error);
                this.toastr.error('Could not complete your request.');
              }
            )
          }
          return true;
        },
        buttonClass: 'btn-rounded bg-success'
      },
      { text: 'Close', onAction: () => true, buttonClass: 'btn-rounded' },
    ];
    this.authorizeService.getUser().subscribe(
      user => this.currentUserId = user && user['id'],
      error => console.log(error)
    );
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.isNewOrder = options.data.isNewOrder;
    this.orderId = options.data.orderId;
  }

  setLocation(event) {
    this.longitude = event.longitude;
    this.latitude = event.latitude;
  }
}
