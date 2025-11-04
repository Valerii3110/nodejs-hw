//* server.js
//* Головний файл серверу */
import express from 'express';
//* Імпорт налаштувань змінних оточення */
import 'dotenv/config.js';
//* Імпорт CORS для керування політикою доступу */
import cors from 'cors';
//* Імпорт логування HTTP-запитів */
import helmet from 'helmet';

//* Підключення до MongoDB */
import { connectMongoDB } from './db/connectMongoDB.js';
//* Імпорт проміжного ПЗ */
import { logger } from './middleware/logger.js';
//* Імпорт обробників помилок */
import { notFoundHandler } from './middleware/notFoundHandler.js';
//* Імпорт глобального обробника помилок */
import { errorHandler } from './middleware/errorHandler.js';
//* Імпорт роутів нотаток */
import notesRoutes from './routes/notesRoutes.js';
//* Ініціалізація додатку */
const app = express();
//* Визначення порту */
const PORT = process.env.PORT ?? 3000;

//* Використання проміжного ПЗ */
app.use(logger);
//* Парсинг JSON-запитів */
app.use(express.json());
//* Захист HTTP-заголовків */
app.use(cors());
//* Додавання заголовків безпеки */
app.use(helmet());
//* Використання роутів нотаток */
app.use('/', notesRoutes);
//* Обробка неіснуючих маршрутів */
app.use(notFoundHandler);
//* Глобальний обробник помилок */
app.use(errorHandler);
//* Запуск сервера після підключення до бази даних */
await connectMongoDB();
//* Запуск сервера */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
