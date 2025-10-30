import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import helmet from 'helmet';
import 'dotenv/config.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(helmet());
app.use(pinoHttp());
app.use(express.json());

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  console.log('Params:', req.params);
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

// Виправлений маршрут для тестової помилки
app.get('/test-error', (req, res, next) => {
  next(new Error('Simulated server error'));
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  if (req && req.log && typeof req.log.error === 'function') {
    req.log.error(err);
  } else {
    console.error(err);
  }
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
