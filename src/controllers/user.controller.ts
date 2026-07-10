import { NextFunction, Request, Response } from 'express';
import {
  loginService,
  protectService,
  signupService,
} from '../services/user.service';

export const signup = async (req: Request, res: Response) => {
  const { newUser, token } = await signupService(req);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      newUser,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { user, token } = await loginService(req);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const protect = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  await protectService(req);

  next();
};
