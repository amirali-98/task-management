import { Router } from 'express';
import { protect } from '../controllers/user.controller';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from '../controllers/task.controller';

const router = Router();

router.route('/').post(protect, createTask).get(protect, getAllTasks);

router
  .route('/:id')
  .get(protect, getTask)
  .patch(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
