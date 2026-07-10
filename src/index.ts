import express from 'express';
import moragan from 'morgan';

import userRoutes from './routes/user.route';
import taskRoutes from './routes/task.route';
import globalErrorHandler from './middlewares/error.middleware';
import AppError from './utils/appError.util';

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(moragan('dev'));
}

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use((req, _, next) => {
  next(
    new AppError(`You cant access to ${req.originalUrl} on this server.`, 404),
  );
});

app.use(globalErrorHandler);

export default app;
