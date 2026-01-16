import express from "express";
import { askQuestion } from "../controllers/askController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// 🔐 Only logged-in users can ask questions
router.post("/", protect, askQuestion);

export default router;
