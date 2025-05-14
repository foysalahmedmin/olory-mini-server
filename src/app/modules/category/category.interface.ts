import { TProduct } from '../product/product.interface';

export interface Category {
  id: number;
  name: string;
  products?: TProduct[];
  createdAt: Date;
  updatedAt: Date;
}
