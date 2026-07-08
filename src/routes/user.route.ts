import { Router } from 'express';
import { signup, login } from '../controllers/user.controller';

const router = Router();

router.post('/signup', signup);
router.post('/signup', login);

export default router;
