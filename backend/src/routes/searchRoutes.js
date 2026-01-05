import express from "express";
import {
  semanticSearch,
  getChunkById,
} from "../controllers/searchController.js";

const router = express.Router();

router.post("/search", semanticSearch);

// 🔥 YE LINE HONA HI CHAHIYE
router.get("/chunk/:doc/:chunkId", getChunkById);

export default router;
