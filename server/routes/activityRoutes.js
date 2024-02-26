import express from "express";
import { createActivity } from "../controllers/activityController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router=express.Router();
router.post("/activity",verifyToken, createActivity);
export default router;