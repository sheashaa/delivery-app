import { Product } from "./product.model";
import { Restaurant } from "./restaurant.model";

export interface Branch {
  id: number;
  name: string;
  governorate: string;
  city: string;
  street: string;
  latitude: number;
  longitude: number;
  phone: string;
  restaurantId: number;
  restaurant: Restaurant;
  products: Product[];
}
