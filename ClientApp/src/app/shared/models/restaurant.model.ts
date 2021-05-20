import { Branch } from './branch.model';
//import { User } from './user.model';

export interface Restaurant {
  id: number;
  name: string;
  website: string;
  branches: Branch[];
  managerId: number;
  //manager: User;
}
