import { Customer } from '../customer/customer.interface';
import { TProduct } from '../product/product.interface';

export interface Order {
  id: number;
  customerId: number;
  customer?: Customer;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  order?: Order;
  product?: TProduct;
}
