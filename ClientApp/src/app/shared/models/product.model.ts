import {Category} from './category.model';
import {Branch} from './branch.model';

export interface Product {
  id:Number;
  name:String;
  description:String;
  price:Number;
  image:String;
  count:Number;
  branchId:Number;
  categories:Category[];
  branch:Branch;
}
