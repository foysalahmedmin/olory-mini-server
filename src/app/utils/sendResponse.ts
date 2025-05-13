import { Response } from 'express';

type TResponse<T> = {
  status: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data.status).json({
    success: data.success,
    status: data.status,
    message: data?.message || '',
    data: data.data,
  });
};

export default sendResponse;
