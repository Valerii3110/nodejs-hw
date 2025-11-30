// src/routes/userRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { updateUserAvatar } from '../controllers/userController.js';
// Імпортуємо middleware
import { upload } from '../middleware/multer.js';

const router = Router();

// Оновлення аватара користувача
router.patch(
  '/users/me/avatar',
  authenticate,
  // Додаємо після авторизації, але до контролера
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
