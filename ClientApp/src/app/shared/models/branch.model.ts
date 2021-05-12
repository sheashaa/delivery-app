import { Product } from "./product.model";
import { Restaurant } from "./restaurant.model";

export interface Branch {
  id:Number;
  name:String;
  governorate:String;
  city:String;
  street:String;
  latitude:Number;
  longitude:Number;
  phone:String;
  restaurantId:Number;
  restaurant:Restaurant;
  products:Product[];
}
