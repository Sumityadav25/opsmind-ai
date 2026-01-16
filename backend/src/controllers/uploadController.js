import SOPChunk from '../models/SOPChunk.js';
import { generateEmbedding } from '../utils/embeddingGenerator.js';
import { pdfParser } from '../utils/pdfParser.js';

export const uploadPDF = async (req, res) => {
  try {
    console.log('📄 Upload:', req.file?.originalname, 'Size:', req.file?.size);

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No valid PDF uploaded' });
    }

    const documentName = req.file.originalname.replace('.pdf', '');
    const chunks = await pdfParser(req.file.buffer);

    // ✅ FIXED: chunkId as NUMBER (not string)
    let savedCount = 0;
    for (let i = 0; i < chunks.length; i++) {
      await SOPChunk.create({
        documentName,
        chunkId: i + 1,  // ✅ NUMBER only (1, 2, 3...)
        text: chunks[i],
        embedding: generateEmbedding(chunks[i]),
        uploadedBy: req.user.id

      });
      savedCount++;
    }

    console.log(`✅ Saved ${savedCount} chunks from ${documentName}`);
    res.json({
      message: `✅ ${documentName} processed! ${savedCount} chunks added to knowledge base`,
      chunks: savedCount
    });

  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    res.status(500).json({ error: error.message });
  }
};
