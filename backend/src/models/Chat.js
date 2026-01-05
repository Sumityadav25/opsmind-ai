import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: String, default: "guest" },
  question: String,
  answer: String,
  sources: Array,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Chat", chatSchema);
