// src/model/note.js
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

noteSchema.index({ title: 'text', content: 'text' });

export const Note = model('Note', noteSchema);
