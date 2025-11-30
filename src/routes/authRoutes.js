// src/routes/authRoutes.js
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const router = Router();

// Регістрація
router.post('/register', celebrate({ body: registerUserSchema }), registerUser);

// Логін
router.post('/login', celebrate({ body: loginUserSchema }), loginUser);

// Логаут
router.post('/logout', logoutUser);

// Оновлення сесії
router.post('/refresh', refreshUserSession);

// Запит на скидання пароля
router.post(
  '/request-reset-email',
  celebrate({
    body: requestResetEmailSchema[Segments.BODY],
  }),
  requestResetEmail,
);

// Скидання пароля
router.post(
  '/reset-password',
  celebrate({
    body: resetPasswordSchema[Segments.BODY],
  }),
  resetPassword,
);

export default router;
