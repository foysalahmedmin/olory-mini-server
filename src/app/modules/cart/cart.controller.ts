import { Request, Response } from 'express';
import * as CartService from './cart.service';

export const addToCart = async (req: Request, res: Response) => {
  const result = await CartService.addToCart(req.session, req.body);
  res.status(200).json(result);
};
