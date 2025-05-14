import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import * as ProductService from './product.service';

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getProducts(req.query);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Products retrieved successfully',
    data: result.data,
    meta: result?.meta,
  });
});

export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await ProductService.getProduct(id);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await ProductService.updateProduct(id, req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await ProductService.deleteProduct(id);

  sendResponse(res, {
    status: 204,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});
