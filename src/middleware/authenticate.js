// src/middleware/authenticate.js
import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next(createHttpError(401, 'Missing access token'));
    }

    // Шукаємо сесію за accessToken
    const session = await Session.findOne({ accessToken });
    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    // Перевіряємо, чи accessToken не прострочений
    if (new Date() > session.accessTokenValidUntil) {
      return next(createHttpError(401, 'Access token expired'));
    }

    // Знаходимо користувача, пов'язаного з цією сесією
    const user = await User.findById(session.userId);
    if (!user) {
      return next(createHttpError(401));
    }

    // Додаємо користувача до req
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
