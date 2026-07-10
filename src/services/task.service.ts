import { Request } from 'express';
import { Task } from '../models/task.model';

export const createTaskService = async (req: Request) => {
  const user = req.user;

  const newTask = await Task.create({
    ...req.body,
    user: user?._id,
  });

  return newTask;
};
