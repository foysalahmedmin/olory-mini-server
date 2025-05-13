import { TErrorResponse } from '../interface/error.interface';

const handleDuplicateError = (err: any): TErrorResponse => {
  const sources = Object.entries(err?.keyValue).map((val) => {
    const [key, value] = val;
    return {
      path: key || '',
      message: `${value} is already exists`,
    };
  });

  const status = 400;

  return {
    status,
    message: 'Invalid ID',
    sources,
  };
};

export default handleDuplicateError;
