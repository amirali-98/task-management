import { Request, Response } from 'express';
import { signupService } from '../services/user.service';

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
