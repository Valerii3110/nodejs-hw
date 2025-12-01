// src/controllers/authController.js
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';
import { createSession, setSessionCookies } from '../services/auth.js';
import { sendEmail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

// Реєстрація користувача

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (await User.findOne({ email })) {
      return next(createHttpError(400, 'Email in use'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    const newSession = await createSession(newUser._id);
    setSessionCookies(res, newSession);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Логін користувача

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(createHttpError(401, 'Invalid credentials'));
    }

    await Session.deleteMany({ userId: user._id });

    const newSession = await createSession(user._id);
    setSessionCookies(res, newSession);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Оновлення сесії

export const refreshUserSession = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;
    if (!sessionId || !refreshToken) {
      return next(createHttpError(401, 'Session not found'));
    }

    const session = await Session.findOne({ _id: sessionId, refreshToken });
    if (!session || new Date() > session.refreshTokenValidUntil) {
      return next(createHttpError(401, 'Session token expired'));
    }

    await session.deleteOne();

    const newSession = await createSession(session.userId);
    setSessionCookies(res, newSession);

    res.status(200).json({ message: 'Session refreshed' });
  } catch (error) {
    next(error);
  }
};

// Логаут користувача

export const logoutUser = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;
    if (sessionId) await Session.deleteOne({ _id: sessionId });

    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// Запит на скидання пароля
export const requestResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // anti user enumeration
    if (!user) {
      return res.status(200).json({
        message:
          'If a user with that email exists, a reset email has been sent.',
      });
    }

    const resetToken = jwt.sign(
      { sub: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );

    const resetLink = `${process.env.FRONTEND_DOMAIN}/reset-password?token=${resetToken}`;

    const templatePath = path.resolve(
      'src/templates/reset-password-email.html',
    );
    const templateSource = await fs.readFile(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    // 🔹 Передаємо username замість email
    const html = template({ name: user.username, resetLink });

    try {
      await sendEmail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Reset your password',
        html,
      });
    } catch {
      return next(
        createHttpError(
          500,
          'Failed to send the email, please try again later.',
        ),
      );
    }

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    next(error);
  }
};

// Скидання пароля
export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return next(createHttpError(401, 'Invalid or expired token'));
  }

  const user = await User.findOne({ _id: payload.sub, email: payload.email });
  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.updateOne({ _id: user._id }, { password: hashedPassword });

  res.status(200).json({ message: 'Password reset successfully' });
};
