//* src/controllers/notesController.js */
import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

//* Отримання всіх нотаток
export const getAllNotes = async (req, res, next) => {
  try {
    const { tag, search, page = 1, perPage = 10 } = req.query;
    const skip = (page - 1) * perPage;

    const query = Note.find();

    if (tag) query.where('tag').equals(tag);
    if (search) query.find({ $text: { $search: search } });

    const totalNotes = await Note.countDocuments(query.getFilter());
    const notes = await query.skip(skip).limit(Number(perPage)).exec();
    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page: Number(page),
      perPage: Number(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

//* Отримання нотатки за ID
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

//* Створення нової нотатки
export const createNote = async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;
    const newNote = await Note.create({ title, content, tag });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

//* Оновлення нотатки за ID
export const updateNote = async (req, res, next) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.noteId,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

//* Видалення нотатки за ID
export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.noteId);

    if (!deletedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(deletedNote); //  має бути 200 і повернення видаленої нотатки
  } catch (error) {
    next(error);
  }
};
