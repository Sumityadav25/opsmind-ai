import mongoose from "mongoose";

const sopChunkSchema = new mongoose.Schema({
  documentName: String,
  chunkId: Number,
  text: String,
  embedding: [Number],
});

export default mongoose.model("SOPChunk", sopChunkSchema);
