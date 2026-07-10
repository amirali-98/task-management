import { Error as MongooseError } from 'mongoose';
import jwt from 'jsonwebtoken';
import AppError from './appError.util';

export const handleCastErrorDB = (err: MongooseError.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

export const handleValidationErrorDB = (err: MongooseError.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

type MongoDuplicateKeyError = {
  code?: number;
  keyValue?: Record<string, unknown>;
};

export const handleDuplicateFieldsDB = (err: MongoDuplicateKeyError) => {
  const value = err.keyValue ? Object.values(err.keyValue).join(', ') : 'value';
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

export const handleJWTError = (_err: jwt.JsonWebTokenError) =>
  new AppError('Invalid token. Please log in again.', 401);

export const handleJWTExpiredError = (_err: jwt.TokenExpiredError) =>
  new AppError('Your token has expired. Please log in again.', 401);
