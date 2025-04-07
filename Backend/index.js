import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import doctorRoutes from './routes/doctor.js';
import mailRoutes from './routes/mail.js';
import { init } from './utils/db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/mail', mailRoutes);

const startServer = async () => {
  await init(); // 💡 wait for the DB to be ready before starting
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
