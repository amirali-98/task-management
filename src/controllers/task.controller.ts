import { Request, Response } from 'express';
import { createTaskService } from '../services/task.service';

export const createTask = async (req: Request, res: Response) => {
  const newTask = await createTaskService(req);

  res.status(201).json({
    status: 'success',
    data: {
      newTask,
    },
  });
};
