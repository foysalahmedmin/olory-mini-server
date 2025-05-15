import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import * as OrderService from './order.service';

export const checkout = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.body;
  const result = await OrderService.checkout(req.session, customerId);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

export const getOrders = catchAsync(async (_req: Request, res: Response) => {
  const result = await OrderService.getOrders();

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

export const getOrder = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await OrderService.getOrder(id);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

export const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await OrderService.deleteOrder(id);

  sendResponse(res, {
    status: 204,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});
