import express from 'express';
import moragan from 'morgan';

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(moragan('dev'));
}

export default app;
