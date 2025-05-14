import { Product } from '../product/product.interface';

export interface Category {
  id: number;
  name: string;
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}
