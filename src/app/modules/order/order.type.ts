import { TCustomer } from "../customer/customer.type";
import { TProduct } from "../product/product.type";

export type TOrder = {
  id: number;
  customerId: number;
  customer?: TCustomer;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items?: TOrderItem[];
};

export type TOrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  order?: TOrder;
  product?: TProduct;
};
