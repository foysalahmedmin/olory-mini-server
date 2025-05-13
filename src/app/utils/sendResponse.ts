import { Response } from 'express';

type TResponse<T> = {
  status: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
};

const sendResponse = <T>(res: Response, payload: TResponse<T>) => {
  const { status, success, message, data, meta } = payload;
  return res.status(status).json({
    success: success,
    status: status,
    message: message ?? (status === 200 || status === 201 ? 'Success' : ''),
    data: data,
    ...(meta && { meta }),
  });
};

export default sendResponse;
