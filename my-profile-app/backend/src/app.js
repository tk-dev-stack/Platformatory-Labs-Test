import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { createUserTable } from './models/user.model.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use(errorHandler);

createUserTable();

export default app;