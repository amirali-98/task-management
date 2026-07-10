import { Request, Response } from 'express';
import {
  createTaskService,
  getAllTasksService,
} from '../services/task.service';

export const createTask = async (req: Request, res: Response) => {
  const newTask = await createTaskService(req);

  res.status(201).json({
    status: 'success',
    data: {
      newTask,
    },
  });
};

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await getAllTasksService(req);

  res.status(200).json({
    status: 'success',
    result: tasks.length,
    data: {
      tasks,
    },
  });
};
