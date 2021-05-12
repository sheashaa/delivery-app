import { Delivery } from "./delivery.model";
import { OrderItem } from "./orderitem.model";
import { User } from "./user.model";

export interface Order {
  id: number;
  dateTime: Date;
  address: string;
  items: OrderItem[];
  deliveryId: number;
  delivery: Delivery;
  customerId: number;
  customer: User;
}
