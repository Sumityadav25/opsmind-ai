const API_BASE = "http://localhost:5000/api";

export async function askQuestion(question) {
  const res = await fetch(`${API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) throw new Error("Ask failed");
  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${API_BASE}/history`);
  if (!res.ok) throw new Error("History fetch failed");
  return res.json();
}

export async function clearHistory() {
  const res = await fetch(`${API_BASE}/history`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Clear failed");
  return res.json();
}
