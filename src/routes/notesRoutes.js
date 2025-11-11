//* src/routes/notesRoutes.js
import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

//* Ініціалізація роутера
const router = Router();

//* Маршрути нотаток з валідацією
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);
router.delete('/notes/:noteId', deleteNote);

//* Експорт роутера
export default router;
