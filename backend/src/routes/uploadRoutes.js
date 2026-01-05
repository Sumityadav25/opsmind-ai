import express from "express";
import multer from "multer";
import { uploadPDF } from "../controllers/uploadController.js";

const router = express.Router();

// 🔥 MEMORY storage REQUIRED (buffer ke liye)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadPDF);

export default router;
