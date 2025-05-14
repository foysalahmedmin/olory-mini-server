import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import * as CartService from './cart.service';

export const getCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.getCart(req.session);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Cart retrieved successfully',
    data: result,
  });
});

export const addToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.addToCart(req.session, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Item added to cart successfully',
    data: result,
  });
});

export const removeFromCart = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CartService.removeFromCart(req.session, req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Item removed from cart successfully',
      data: result,
    });
  },
);
