// src/controllers/notesController.js
import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

//* Отримання всіх нотаток поточного користувача
export const getAllNotes = async (req, res, next) => {
  try {
    const { tag, search, page = 1, perPage = 10 } = req.query;
    const skip = (page - 1) * perPage;

    // 🔹 Додаємо обов'язковий фільтр за користувачем
    const filter = { userId: req.user._id };

    if (tag) filter.tag = tag;
    if (search) filter.$text = { $search: search };

    const [totalNotes, notes] = await Promise.all([
      Note.countDocuments(filter),
      Note.find(filter).skip(skip).limit(Number(perPage)),
    ]);

    res.status(200).json({
      page: Number(page),
      perPage: Number(perPage),
      totalNotes,
      totalPages: Math.ceil(totalNotes / perPage),
      notes,
    });
  } catch (error) {
    next(error);
  }
};

//* Отримання нотатки за ID (тільки якщо належить користувачу)
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.noteId,
      userId: req.user._id, // 🔹 Перевірка власності
    });

    if (!note) throw createHttpError(404, 'Note not found');

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

//* Створення нової нотатки (прив'язуємо до користувача)
export const createNote = async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;

    const newNote = await Note.create({
      title,
      content,
      tag,
      userId: req.user._id, // 🔹 Прив'язка до користувача
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

//* Оновлення нотатки (тільки якщо належить користувачу)
export const updateNote = async (req, res, next) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: req.params.noteId,
        userId: req.user._id, // 🔹 Перевірка власності
      },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedNote) throw createHttpError(404, 'Note not found');

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

//* Видалення нотатки (тільки якщо належить користувачу)
export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.noteId,
      userId: req.user._id, // 🔹 Перевірка власності
    });

    if (!deletedNote) throw createHttpError(404, 'Note not found');

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};
