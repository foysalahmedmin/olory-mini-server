import { TCategory } from "../category/category.type";
import { TOrderItem } from "../order/order.type";

export type TProduct = {
  id: number;
  name: string;
  thumbnail?: string;
  description?: string;
  price: number;
  rating: number;
  categoryId: number;
  category?: TCategory;
  orderItems?: TOrderItem[];
};

export type TProductQuery = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  search?: string;
};
