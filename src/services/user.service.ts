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
