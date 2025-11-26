// src/routes/authRoutes.js
// src/routes/authRoutes.js
import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailShema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const router = Router();

// Регістрація
router.post('/register', celebrate({ body: registerUserSchema }), registerUser);

// Логін
router.post('/login', celebrate({ body: loginUserSchema }), loginUser);

// Оновлення сесії
router.post('/refresh', refreshUserSession);

// Логаут
router.post('/logout', logoutUser);

// Запит на скидання пароля
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailShema),
  requestResetEmail,
);

// Скидання пароля
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default router;
