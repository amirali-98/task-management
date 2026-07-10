import { Router } from 'express';
import { protect } from '../controllers/user.controller';
import { createTask, getAllTasks } from '../controllers/task.controller';

const router = Router();

router.route('/').post(protect, createTask).get(protect, getAllTasks);

export default router;
