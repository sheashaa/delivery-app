import { Category } from './category.model';
import { Branch } from './branch.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  branchId: number;
  categories: Category[];
  branch: Branch;
}
