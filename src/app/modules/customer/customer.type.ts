import { TOrder } from "../order/order.type";

export type TCustomer = {
  id?: number;
  userId?: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  orders?: TOrder[];
  createdAt: Date;
  updatedAt: Date;
};
