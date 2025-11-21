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
import { authenticate } from '../middleware/authenticate.js';

//* Ініціалізація роутера
const router = Router();
//* Використання проміжного ПЗ для автентифікації */
router.use(authenticate);

//* Маршрути нотаток з валідацією
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

//* Експорт роутера
export default router;
