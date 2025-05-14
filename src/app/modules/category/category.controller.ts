import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import * as CategoryServices from './category.service';

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getCategories();
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const getCategory = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await CategoryServices.getCategory(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

export const getCategoriesWithProducts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.getCategoriesWithProducts();
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Categories with products retrieved successfully',
      data: result,
    });
  },
);

export const getCategoryWithProducts = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await CategoryServices.getCategoryWithProducts(id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Category with products retrieved successfully',
      data: result,
    });
  },
);

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.createCategory(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  },
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await CategoryServices.updateCategory(id, req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Category updated successfully',
      data: result,
    });
  },
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await CategoryServices.deleteCategory(id);
    sendResponse(res, {
      status: 204,
      success: true,
      message: 'Category deleted successfully',
      data: null,
    });
  },
);
