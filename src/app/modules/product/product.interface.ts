import { Category } from '../category/category.interface';

export interface OrderItem {
  id: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  rating: number;
  categoryId: number;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
  orderItems?: OrderItem[];
}

export interface TProductQuery {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  search?: string;
}
