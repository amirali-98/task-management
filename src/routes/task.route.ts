import { Router } from 'express';
import { protect } from '../controllers/user.controller';
import {
  createTask,
  getAllTasks,
  getTask,
} from '../controllers/task.controller';

const router = Router();

router.route('/').post(protect, createTask).get(protect, getAllTasks);

router.route('/:id').get(protect, getTask);

export default router;
