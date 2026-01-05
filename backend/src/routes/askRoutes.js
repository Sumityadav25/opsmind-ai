import express from "express";
import {
  askQuestion,
  getChatHistory,
  clearChatHistory,
} from "../controllers/askController.js";

const router = express.Router();

router.post("/ask", askQuestion);
router.get("/history", getChatHistory);
router.delete("/history", clearChatHistory); // 🔥 clear chat

export default router;
