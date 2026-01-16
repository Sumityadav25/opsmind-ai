import express from "express";
import multer from "multer";
import { protect, adminOnly } from "../middleware/auth.js";
import { uploadPDF } from "../controllers/uploadController.js";
import SOPChunk from "../models/SOPChunk.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDFs allowed"), false);
  }
});

/* ================= ADMIN GLOBAL SOP ================= */
router.post(
  "/admin",
  protect,
  adminOnly,
  upload.single("file"),
  uploadPDF
);

/* ================= USER PERSONAL SOP ================= */
router.post(
  "/user",
  protect,
  upload.single("file"),
  uploadPDF
);

/* ================= LIST USER DOCS ================= */
router.get("/list", protect, async (req, res) => {
  const docs = await SOPChunk.distinct("documentName", {
    uploadedBy: req.user.id
  });
  res.json(docs);
});

/* ================= DELETE USER DOC ================= */
router.delete("/:doc", protect, async (req, res) => {
  await SOPChunk.deleteMany({
    documentName: req.params.doc,
    uploadedBy: req.user.id
  });
  res.json({ message: "Deleted" });
});

export default router;
