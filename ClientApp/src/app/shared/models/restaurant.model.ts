import {Branch} from './branch.model';

export interface Restaurant {
  id:Number;
  name:String;
  website:String;
  managerId:Number;
  branches: Branch[];
  manager;
}
