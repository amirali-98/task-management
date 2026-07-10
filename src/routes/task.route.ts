import { Router } from 'express';
import { protect } from '../controllers/user.controller';
import { createTask } from '../controllers/task.controller';

const router = Router();

router.route('/').post(protect, createTask);

export default router;
