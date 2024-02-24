import express from "express";
import { createUser, Login, updateUser} from "../controllers/userController.js";
//import authenticateToken from "../middleware/authenticateToken.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router =express.Router();
router.post('/signup',createUser);
router.post('/login',Login);
router.put('/update/:id',verifyToken,updateUser);
export default router;