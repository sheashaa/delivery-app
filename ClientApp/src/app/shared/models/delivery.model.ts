import { Branch } from "./branch.model";
import { Order } from "./order.model";
//import { User } from "./user.model";

export interface Delivery {
  id: number;
  dateTime: Date;
  branchId: number;
  branch: Branch;
  orders: Order[];
  courierId: number;
  //courser: User; 
}
