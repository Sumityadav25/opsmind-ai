import express from "express";
import { semanticSearch, getChunkById } from "../controllers/searchController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// 🔐 Logged-in users only
router.post("/", protect, semanticSearch);

// 🔐 Chunk preview (for citation click)
router.get("/chunk/:doc/:chunkId", protect, getChunkById);

export default router;
