import { Order } from "./order.model";
import { Product } from "./product.model";

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  discount: number;
  orderId: number;
  order: Order;
  productId: number;
  product: Product;
}
