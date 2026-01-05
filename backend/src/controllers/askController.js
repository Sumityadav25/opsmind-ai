import Chat from "../models/Chat.js";
import SOPChunk from "../models/SOPChunk.js";
import { generateEmbedding } from "../utils/embeddingGenerator.js";
import { cosineSimilarity } from "../utils/cosine.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { askOpenAI } from "../utils/openaiClient.js";

/**
 * POST /api/ask
 * Core RAG Ask API + performance logging + chat save
 */
export async function askQuestion(req, res) {
  const startTime = Date.now();

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 1️⃣ Embedding
    const queryEmbedding = generateEmbedding(question);

    // 2️⃣ Fetch SOP chunks
    const chunks = await SOPChunk.find().lean();

    // 3️⃣ Similarity
    const scoredChunks = chunks.map(chunk => ({
      documentName: chunk.documentName,
      chunkId: chunk.chunkId,
      text: chunk.text,
      embedding: chunk.embedding,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }));

    // 4️⃣ Top 3 chunks
    const topChunks = scoredChunks
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // 5️⃣ Prompt
    const prompt = buildPrompt(topChunks, question);

    // 6️⃣ LLM call
    const llmStart = Date.now();
    const finalAnswer = await askOpenAI(prompt);
    const llmTime = Date.now() - llmStart;

    // 7️⃣ Sources
    const sources = topChunks.map(chunk => ({
      documentName: chunk.documentName,
      chunkId: chunk.chunkId,
      score: chunk.score.toFixed(2),
    }));

    // 8️⃣ Save chat
    await Chat.create({
      userId: "guest",
      question,
      answer: finalAnswer,
      sources,
    });

    // ⏱️ Logs
    const totalTime = Date.now() - startTime;
    console.log("📊 RAG PERFORMANCE METRICS");
    console.log("LLM Time:", llmTime, "ms");
    console.log("TOTAL RAG LATENCY:", totalTime, "ms");
    console.log("-----------------------------");

    res.json({ answer: finalAnswer, sources });
  } catch (error) {
    console.error("ASK API ERROR 👉", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * GET /api/history
 * Fetch chat history
 */
export async function getChatHistory(req, res) {
  try {
    const chats = await Chat.find({ userId: "guest" })
      .sort({ createdAt: 1 })
      .lean();

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
}

/**
 * DELETE /api/history
 * Clear chat history
 */
export async function clearChatHistory(req, res) {
  try {
    await Chat.deleteMany({ userId: "guest" });
    res.json({ message: "Chat history cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear chat history" });
  }
}
