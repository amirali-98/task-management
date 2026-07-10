import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError.util';

const globalErrorHandler = (
  err: AppError,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalErrorHandler;
