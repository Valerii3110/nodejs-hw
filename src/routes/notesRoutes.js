//* src/routes/notesRoutes.js
import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
//* Ініціалізація роутера
const router = Router();
//* Маршрути нотаток
router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
router.post('/notes', createNote);
router.patch('/notes/:noteId', updateNote);
router.delete('/notes/:noteId', deleteNote);
//* Експорт роутера
export default router;
