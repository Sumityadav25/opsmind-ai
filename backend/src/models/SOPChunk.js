import mongoose from 'mongoose';

const sopChunkSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: [true, 'Document name required']
  },
  chunkId: {
    type: String,  // ✅ FIXED: String instead of Number
    required: [true, 'Chunk ID required']
  },
  text: {
    type: String,
    required: [true, 'Chunk text required'],
    maxlength: [5000, 'Chunk too long']
  },
  embedding: {
    type: [Number],  // 768-dim vector
    required: [true, 'Embedding required']
  },
  uploadedBy: {
    type: String, // userId
    required: true
  }

}, {
  timestamps: true,
  collection: 'sopchunks'
});

export default mongoose.model('SOPChunk', sopChunkSchema);
