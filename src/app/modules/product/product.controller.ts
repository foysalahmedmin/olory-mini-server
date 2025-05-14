import { Request, Response } from 'express';
import * as ProductService from './product.service';

export const getProducts = async (req: Request, res: Response) => {
  const result = await ProductService.getProducts(req.query);
  res.json(result);
};

export const getProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await ProductService.getProduct(id);
  res.json(result);
};

export const createProduct = async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);
  res.status(201).json(result);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await ProductService.updateProduct(id, req.body);
  res.json(result);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await ProductService.deleteProduct(id);
  res.status(204).end();
};
