// src/server.js
import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3030;

// 🔹 Middleware (порядок важливий)
app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser());

// 🔹 Роутери
app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);

// 🔹 Обробник неіснуючих маршрутів
app.use(notFoundHandler);

// 🔹 Celebrate errors (валідація)
app.use(errors());

// 🔹 Глобальний обробник помилок
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
