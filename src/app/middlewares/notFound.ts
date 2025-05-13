import { RequestHandler } from 'express';

const notFound: RequestHandler = (req, res, next) => {
  return res.status(404).json({
    success: false,
    status: 404,
    message: 'API not found !!',
    error: '',
  });
};

export default notFound;
