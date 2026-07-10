import { Request } from 'express';
import { User, UserInterface } from '../models/user.model';
import { signToken, verifyToken } from '../utils/helper.util';
import AppError from '../utils/appError.util';

export const signupService = async (req: Request<{}, {}, UserInterface>) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });
  newUser.password = undefined;

  const token = signToken(newUser.id);

  return { token, newUser };
};

export const loginService = async (
  req: Request<{}, {}, { email: string; password: string }>,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password.', 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Email or password is incorrect.', 401);
  }

  user.password = undefined;

  const token = signToken(user.id);

  return { token, user };
};

export const protectService = async (req: Request) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError(
      'You are not logged in. Please login and try again.',
      401,
    );
  }

  const decoded = await verifyToken(token);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError('User with this token is not already exists.', 401);
  }

  if (user.isPasswordChangedAfterTokenSet(decoded.iat)) {
    throw new AppError(
      'Password is recently changed. Please login and try again.',
      401,
    );
  }

  req.user = user;
};
