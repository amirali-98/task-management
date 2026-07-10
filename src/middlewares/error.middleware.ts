import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import jwt from 'jsonwebtoken';

import AppError from '../utils/appError.util';
import { sendDevError, sendProdError } from '../utils/sendError.util';
import {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleJWTError,
  handleJWTExpiredError,
  handleValidationErrorDB,
} from '../utils/errorHandlers.util';

type MongoDuplicateKeyError = {
  code?: number;
  keyValue?: Record<string, unknown>;
  message?: string;
};

const globalErrorHandler = (
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  console.dir(err, { depth: null });
  let error: AppError;

  if (err instanceof AppError) {
    error = err;
  } else if (err instanceof MongooseError.CastError) {
    error = handleCastErrorDB(err);
  } else if (err instanceof MongooseError.ValidationError) {
    error = handleValidationErrorDB(err);
  } else if (err instanceof jwt.TokenExpiredError) {
    error = handleJWTExpiredError(err);
  } else if (err instanceof jwt.JsonWebTokenError) {
    error = handleJWTError(err);
  } else if (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    err.code === 11000
  ) {
    error = handleDuplicateFieldsDB(err as MongoDuplicateKeyError);
  } else {
    error = new AppError('Something went wrong!', 500);
  }

  if (process.env.NODE_ENV === 'development') {
    sendDevError(error, res);
  } else if (process.env.NODE_ENV) {
    sendProdError(error, res);
  }
};

export default globalErrorHandler;
