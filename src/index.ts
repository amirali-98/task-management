import express from 'express';
import moragan from 'morgan';

import userRoutes from './routes/user.route';

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(moragan('dev'));
}

app.use('/api/v1/', userRoutes);

export default app;
