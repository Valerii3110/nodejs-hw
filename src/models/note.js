//* src/models/note.js */
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

//* Модель нотатки
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false, // не обов’язкове
      default: '', // за замовчуванням порожній рядок
      trim: true, // обрізає пробіли
      maxlength: 1000,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo', // значення за замовчуванням
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
// 🔍 Індекс для текстового пошуку
noteSchema.index({ title: 'text', content: 'text' });

export const Note = mongoose.model('Note', noteSchema);
