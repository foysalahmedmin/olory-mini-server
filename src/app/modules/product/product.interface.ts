import { Category } from '../category/category.interface';
import { OrderItem } from '../order/order.interface';

export interface TProduct {
  id: number;
  name: string;
  thumbnail?: string;
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
