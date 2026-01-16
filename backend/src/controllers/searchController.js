import SOPChunk from "../models/SOPChunk.js";
import { generateEmbedding } from "../utils/embeddingGenerator.js";
import { cosineSimilarity } from "../utils/cosine.js";

/**
 * POST /api/search
 * Semantic search over SOP chunks
 */
export const semanticSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // 1. Generate query embedding
    const queryEmbedding = generateEmbedding(query);

    // 2. Fetch all SOP chunks
    const chunks = await SOPChunk.find(
      {},
      { documentName: 1, chunkId: 1, text: 1, embedding: 1, _id: 0 }
    ).lean();

    // 3. Compute cosine similarity
    const scoredChunks = chunks.map(chunk => ({
      documentName: chunk.documentName,
      chunkId: chunk.chunkId,
      text: chunk.text,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }));

    // 4. Sort by similarity score (desc)
    scoredChunks.sort((a, b) => b.score - a.score);

    // 5. Return top 3 results
    res.json(scoredChunks.slice(0, 3));
  } catch (err) {
    console.error("Semantic search error:", err);
    res.status(500).json({ error: "Semantic search failed" });
  }
};

/**
 * GET /api/chunk/:doc/:chunkId
 * Fetch exact SOP chunk for citation preview
 */
export const getChunkById = async (req, res) => {
  try {
    const { doc, chunkId } = req.params;

    const chunk = await SOPChunk.findOne({

      uploadedBy: req.user.id

    });

    if (!chunk) {
      return res.status(404).json({ message: "Chunk not found" });
    }

    res.json({
      documentName: chunk.documentName,
      chunkId: chunk.chunkId,
      text: chunk.text,
      page: Math.ceil(chunk.chunkId / 3), // approx page number
    });
  } catch (err) {
    console.error("Get chunk error:", err);
    res.status(500).json({ message: "Failed to fetch chunk" });
  }
};
