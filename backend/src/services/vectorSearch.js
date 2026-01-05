import SOPChunk from "../models/SOPChunk.js";

export const vectorSearch = async (embedding) => {
  return SOPChunk.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: embedding,
        numCandidates: 100,
        limit: 5,
      },
    },
    {
      $project: {
        documentName: 1,
        chunkId: 1,
        text: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]);
};
