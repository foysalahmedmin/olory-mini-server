import { Request, Response } from 'express';
import * as CategoryServices from './category.service';

export const getCategories = async (_req: Request, res: Response) => {
  const result = await CategoryServices.getCategories();
  res.json(result);
};

export const getCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await CategoryServices.getCategory(id);
  res.json(result);
};

export const getCategoriesWithProducts = async (
  req: Request,
  res: Response,
) => {
  const result = await CategoryServices.getCategoriesWithProducts();
  res.json(result);
};

export const getCategoryWithProducts = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await CategoryServices.getCategoryWithProducts(id);
  res.json(result);
};

export const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategory(req.body);
  res.status(201).json(result);
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await CategoryServices.updateCategory(id, req.body);
  res.json(result);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await CategoryServices.deleteCategory(id);
  res.status(204).end();
};
