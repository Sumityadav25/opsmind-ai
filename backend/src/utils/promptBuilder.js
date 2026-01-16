export const buildPrompt = (question, chunks) => {
  const context = chunks
    .map(
      (c, i) =>
        `--- SOP CHUNK ${i + 1} ---\n${c.text}`
    )
    .join("\n\n");

  return `
You are OpsMind AI, an enterprise SOP assistant.

Use the SOP CONTENT below to answer the QUESTION.
Answer concisely and clearly.
If the SOP partially answers the question, answer using the closest relevant information.
If the SOP truly does not contain any relevant information, then say:
"I don't know. This information is not available in the SOP."

SOP CONTENT:
${context}

QUESTION:
${question}

ANSWER:
`;
};
