import { Request, Response } from 'express';
import * as OrderService from './order.service';

export const checkout = async (req: Request, res: Response) => {
  const { customerId } = req.body;
  const result = await OrderService.checkout(req.session, customerId);

  res.status(201).json(result);
};

export const getOrders = async (req: Request, res: Response) => {
  const result = await OrderService.getOrders();
  res.status(200).json(result);
};

export const getOrder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await OrderService.getOrder(id);
  res.status(200).json(result);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await OrderService.deleteOrder(id);
  res.status(204).end();
};
