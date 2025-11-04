//* src/routes/notesRoutes.js
import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNoteById,
} from '../controllers/notesController.js';
//* Ініціалізація роутера
const router = Router();
//* Маршрути нотаток
router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
router.post('/notes', createNote);
router.patch('/notes/:noteId', updateNoteById);
router.delete('/notes/:noteId', deleteNote);
//* Експорт роутера
export default router;
