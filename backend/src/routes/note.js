import Router from "express";
import NoteController from "../controllers/note.js";

const router = Router();

router.post('/', NoteController.createNote);
router.get('/', NoteController.getAllNotes);
router.get('/:id', NoteController.getNoteById);
router.put('/:id', NoteController.updateNote);
router.delete('/:id', NoteController.deleteNote);
export default router;