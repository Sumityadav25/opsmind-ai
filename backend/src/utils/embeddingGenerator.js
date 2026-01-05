export const generateEmbedding = (text) => {
  const embedding = new Array(768).fill(0);

  for (let i = 0; i < text.length; i++) {
    embedding[i % 768] += text.charCodeAt(i) / 255;
  }

  return embedding;
};
