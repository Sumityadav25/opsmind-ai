import SOPChunk from "../models/SOPChunk.js";
import { generateEmbedding } from "../utils/embeddingGenerator.js";
import { cosineSimilarity } from "../utils/cosine.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { askOpenAI } from "../utils/openaiClient.js";
import Chat from "../models/Chat.js";

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    // 1️⃣ Generate query embedding
    const queryEmbedding = generateEmbedding(question);

    // 2️⃣ Fetch ONLY current user's SOP chunks
    const chunks = await SOPChunk.find(
      { uploadedBy: userId },
      { text: 1, embedding: 1, documentName: 1, chunkId: 1 }
    ).lean();

    console.log("User chunks found:", chunks.length);

    if (chunks.length === 0) {
      return res.json({
        answer: "No SOP documents uploaded yet.",
        sources: []
      });
    }

    // 3️⃣ Cosine similarity ranking
    // Rank chunks
    const ranked = chunks
      .map(c => ({
        ...c,
        score: cosineSimilarity(queryEmbedding, c.embedding)
      }))
      .sort((a, b) => b.score - a.score);

    // ✅ ALWAYS TAKE TOP 3 (mock-safe)
    const relevant = ranked.slice(0, 3);

    console.log(
      "Using chunks:",
      relevant.map(r => r.text.slice(0, 40))
    );

    // Safety fallback
    if (relevant.length === 0) {
      return res.json({
        answer: "No SOP content found.",
        sources: []
      });
    }

    // 5️⃣ Build strict RAG prompt
    const prompt = buildPrompt(question, relevant);

    // 6️⃣ Ask OpenAI (correct usage)
    const answer = await askOpenAI(prompt);

    // 7️⃣ Save chat history
    await Chat.create({
      userId,
      question,
      answer,
      sources: relevant.map(r => ({
        documentName: r.documentName,
        chunkId: r.chunkId
      }))
    });

    // 8️⃣ Respond
    res.json({
      answer,
      sources: relevant.map(r => ({
        documentName: r.documentName,
        chunkId: r.chunkId
      }))
    });

  } catch (err) {
    console.error("ASK ERROR:", err);
    res.status(500).json({ message: "Ask failed" });
  }
};
