import { Request, Response } from 'express';
import * as CustomerService from './customer.service';

export const createCustomer = async (req: Request, res: Response) => {
  const userId = req.user?.id as number;
  const payload = req.body;
  const result = await CustomerService.createCustomer(userId, payload);
  res.status(201).json(result);
};

export const getCustomers = async (req: Request, res: Response) => {
  const result = await CustomerService.getCustomers();
  res.status(200).json(result);
};

export const getCustomer = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await CustomerService.getCustomer(id);
  res.status(200).json(result);
};

export const updateCustomer = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const payload = req.body;
  const result = await CustomerService.updateCustomer(id, payload);
  res.status(200).json(result);
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await CustomerService.deleteCustomer(id);
  res.status(204).end();
};
