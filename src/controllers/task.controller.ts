import { NextFunction, Request, Response } from 'express';
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskService,
  updateTaskService,
} from '../services/task.service';
import AppError from '../utils/appError.util';

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

export const getTask = async (req: Request<{ id: string }>, res: Response) => {
  const task = await getTaskService(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
};

export const updateTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  await updateTaskService(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    message: 'Task updated successfuly',
  });
};

export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError('', 401);
    }

    const deletedTask = await deleteTaskService(
      req.params.id,
      req.user._id.toString(),
    );

    res.status(200).json({
      status: 'success',
      message: 'Task deleted successfuly',
      data: {
        deletedTask,
      },
    });
  } catch (error) {
    next(error);
  }
};
