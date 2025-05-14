/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Prisma } from '@prisma/client';
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from '../builder/AppError';
import config from '../config';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TSources } from '../interfaces/error.interface';

const error: ErrorRequestHandler = (error, req, res, next) => {
  let status = 500;
  let message = 'Something went wrong!';
  let sources: TSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    status = simplifiedError?.status;
    message = simplifiedError?.message;
    sources = simplifiedError?.sources;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    status = simplifiedError?.status;
    message = simplifiedError?.message;
    sources = simplifiedError?.sources;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleDuplicateError(error);
    status = simplifiedError?.status;
    message = simplifiedError?.message;
    sources = simplifiedError?.sources;
  } else if (error instanceof AppError) {
    status = error?.status;
    message = error.message;
    sources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    sources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  return res.status(status).json({
    success: false,
    status,
    message,
    sources,
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default error;
