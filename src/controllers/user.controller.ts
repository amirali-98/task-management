import { Request, Response } from 'express';
import { signupService } from '../services/user.service';

export const signup = async (req: Request, res: Response) => {
  await signupService(req);
  res.status(201).json({
    status: 'success',
    token: 'TOKEN',
  });
};
