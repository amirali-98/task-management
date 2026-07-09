import { Request } from 'express';
import { User, UserInterface } from '../models/user.model';
import { signToken } from '../utils/helper.util';

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
    throw new Error('Please provide email and password.');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Email or password is incorrect.');
  }

  user.password = undefined;

  const token = signToken(user.id);

  return { token, user };
};
