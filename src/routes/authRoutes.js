// src/routes/authRoutes.js
// src/routes/authRoutes.js
import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
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

export default router;
