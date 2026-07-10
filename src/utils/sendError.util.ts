import { Response } from 'express';
import AppError from './appError.util';

export const sendDevError = (error: AppError, res: Response) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack,
  });
};

export const sendProdError = (error: AppError, res: Response) => {
  if (error.operational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.',
    });
  }
};
