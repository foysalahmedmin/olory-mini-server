import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import * as CustomerService from './customer.service';

export const createCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as number;
    const payload = req.body;
    const result = await CustomerService.createCustomer(userId, payload);

    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Customer created successfully',
      data: result,
    });
  },
);

export const getCustomers = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerService.getCustomers();

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Customers retrieved successfully',
    data: result,
  });
});

export const getCustomer = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await CustomerService.getCustomer(id);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Customer retrieved successfully',
    data: result,
  });
});

export const updateCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const payload = req.body;
    const result = await CustomerService.updateCustomer(id, payload);

    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Customer updated successfully',
      data: result,
    });
  },
);

export const deleteCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await CustomerService.deleteCustomer(id);

    sendResponse(res, {
      status: 204,
      success: true,
      message: 'Customer deleted successfully',
      data: null,
    });
  },
);
