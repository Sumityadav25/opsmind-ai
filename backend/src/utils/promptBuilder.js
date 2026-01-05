export function buildPrompt(chunks, question) {
  const context = chunks
    .map((chunk, index) => {
      return `Source ${index + 1}:\n${chunk.text}`;
    })
    .join("\n\n");

  return `
You are an enterprise SOP assistant.

Answer ONLY using the SOP context below.
If the answer is not present, respond exactly with:
"I don't know. This information is not available in the SOP."

SOP CONTEXT:
-------------
${context}

QUESTION:
${question}

ANSWER:
`;
}
