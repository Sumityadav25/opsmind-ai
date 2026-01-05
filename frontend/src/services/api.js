const API_BASE = "https://opsmind-ai-bxta.onrender.com/api";

// Ask question
export async function askQuestion(question) {
  const res = await fetch(`${API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error("Ask failed");
  }

  return res.json();
}

// Get chat history
export async function getHistory() {
  const res = await fetch(`${API_BASE}/history`);
  if (!res.ok) throw new Error("History fetch failed");
  return res.json();
}

// Clear chat history
export async function clearHistory() {
  const res = await fetch(`${API_BASE}/history`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Clear failed");
  return res.json();
}
