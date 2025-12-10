import express from "express";
import { uploadPDF } from "../controllers/uploadController.js";
import multer from "multer";

const router = express.Router();

// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route: POST /api/upload/pdf
router.post("/pdf", upload.single("file"), uploadPDF);

export default router;
