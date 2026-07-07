import dotenv from 'dotenv';
dotenv.config();

import app from '.';
import { connectDB } from './configs/db';

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`http://localhost:${PORT}`);
});
