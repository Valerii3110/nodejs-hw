//* src/models/note.js */
import mongoose from 'mongoose';

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
      required: true,
      maxlength: 1000,
    },
    tag: {
      type: String,
      enum: [
        'Shopping',
        'Meeting',
        'Travel',
        'Health',
        'Work',
        'Finance',
        'Personal',
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Note = mongoose.model('Note', noteSchema);
