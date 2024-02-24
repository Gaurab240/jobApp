import express from "express";
import { createActivity } from "../controllers/activityController.js";

const router=express.Router();
router.post("/activity",createActivity);
export default router;