// src/services/auth.js
import crypto from 'crypto';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';

/**
 * Створює accessToken та refreshToken, зберігає сесію в БД і повертає її.
 * @param {string} userId - Ідентифікатор користувача
 * @returns {Promise<Session>} - Створена сесія
 */
export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(32).toString('hex');
  const refreshToken = crypto.randomBytes(64).toString('hex');

  const now = new Date();

  const session = await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now.getTime() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(now.getTime() + ONE_DAY),
  });

  return session;
};

/**
 * Додає до відповіді кукі: accessToken, refreshToken та sessionId
 * @param {object} res - Об'єкт відповіді Express
 * @param {object} session - Сесія, створена createSession
 */
export const setSessionCookies = (res, session) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  res.cookie('accessToken', session.accessToken, {
    ...cookieOptions,
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    ...cookieOptions,
    maxAge: ONE_DAY,
  });

  res.cookie('sessionId', session._id.toString(), {
    ...cookieOptions,
    maxAge: ONE_DAY,
  });
};
