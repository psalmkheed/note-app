import Router from "express";
import NoteController from "../controllers/note.js";
import authenticateUser from "../middleware/auth.js";
 
const router = Router();

router.post('/:id', authenticateUser, NoteController.createNote);
//router.get('/', authenticateUser, NoteController.getAllNotes);
router.get('/', authenticateUser, NoteController.getUserNotes);
router.get('/:id', authenticateUser,  NoteController.getNoteById);
router.put('/:id', authenticateUser, NoteController.updateNote);
router.delete('/:id', authenticateUser, NoteController.deleteNote);
export default router;