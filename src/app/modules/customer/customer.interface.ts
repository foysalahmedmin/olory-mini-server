import { Order } from '../order/order.interface';

export interface Customer {
  id?: number;
  userId?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  orders?: Order[];
  createdAt: Date;
  updatedAt: Date;
}
