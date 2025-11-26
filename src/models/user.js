// src/models/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

// Створюємо схему користувача
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      default: null, // буде заповнюватись у pre('save')
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
  },
  {
    versionKey: false,
    timestamps: true, // автоматично створює createdAt та updatedAt
  },
);

// Метод toJSON для видалення пароля при відправленні об'єкта користувача
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Хук pre('save') для автоматичного встановлення username = email, якщо username не заданий
// Хук pre('save')
userSchema.pre('save', async function (next) {
  // Якщо username не заданий, ставимо як email
  if (!this.username) {
    this.username = this.email;
  }

  // Хешування пароля, якщо він новий або змінений
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Модель користувача
export const User = model('User', userSchema);
