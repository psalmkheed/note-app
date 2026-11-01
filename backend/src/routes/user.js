import { Router } from "express";
import UserController from "../controllers/user.js"
import authenticateUser from "../middleware/auth.js";

const router = Router()

router.post('/', UserController.createUser);
router.get('/:id', UserController.getUser);
router.get('/', UserController.getAllUsers);
router.post('/auth/login', UserController.login);
router.post("/auth/logout", authenticateUser, UserController.logout
);
export default router;