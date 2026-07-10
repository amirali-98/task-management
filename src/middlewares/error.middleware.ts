import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError.util';
import { sendDevError, sendProdError } from '../utils/sendError.util';

const globalErrorHandler = (
  err: AppError,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV) {
    sendProdError(err, res);
  }
};

export default globalErrorHandler;
