import { TProduct } from "../product/product.type";

export type TCategory = {
  id: number;
  name: string;
  products?: TProduct[];
};
