import { parsePDF } from "../utils/pdfParser.js";
import { chunkText } from "../utils/chunker.js";
import { generateEmbedding } from "../utils/embeddingGenerator.js";
import SOPChunk from "../models/SOPChunk.js";

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1️⃣ Get PDF buffer
    const pdfBuffer = req.file.buffer;

    // 2️⃣ Parse PDF
    const text = await parsePDF(pdfBuffer);

    // 3️⃣ Chunk text
    const chunks = chunkText(text);

    // 4️⃣ Store chunks
    for (let i = 0; i < chunks.length; i++) {
      const embedding = generateEmbedding(chunks[i]);

      await SOPChunk.create({
        documentName: req.file.originalname,
        chunkId: i,
        text: chunks[i],
        embedding
      });
    }

    res.json({ message: "PDF processed and stored" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "PDF upload failed" });
  }
};
