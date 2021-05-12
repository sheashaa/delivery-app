import {Product} from './product.model';

export interface Category {
  Id:Number;
  Name:String;
  Products:Product[];
}
