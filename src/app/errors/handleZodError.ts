import { ZodError, ZodIssue } from 'zod';
import {
  TErrorResponse,
  TSources,
} from '../interface/error.interface';

const handleZodError = (err: ZodError): TErrorResponse => {
  const sources: TSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const status = 400;

  return {
    status,
    message: 'Validation Error',
    sources,
  };
};

export default handleZodError;
