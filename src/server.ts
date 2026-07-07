import dotenv from 'dotenv';
dotenv.config();

import app from '.';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
