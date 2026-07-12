import { Request } from 'express';
import { Task } from '../models/task.model';
import AppError from '../utils/appError.util';

export const createTaskService = async (req: Request) => {
  const user = req.user;

  const newTask = await Task.create({
    ...req.body,
    user: user?._id,
  });

  return newTask;
};

export const getAllTasksService = async (req: Request) => {
  const user = req.user;

  const tasks = await Task.find({ user: user?._id });

  return tasks;
};

export const getTaskService = async (id: string) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new AppError('No task found with that id', 404);
  }

  return task;
};
