import { useEffect, useState } from "react";
import { ask, getHistory } from "../services/api";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHistory().then((data) => {
      if (Array.isArray(data)) setMessages(data);
    });
  }, []);

  const send = async () => {
    const q = question.trim();

    // 🔐 block empty / junk messages
    if (!q || q.length < 3) {
      setQuestion("");
      return;
    }

    setLoading(true);

    // optimistic UI (user message first)
    setMessages((prev) => [
      ...prev,
      { question: q, answer: "…" }
    ]);

    setQuestion("");

    try {
      const res = await ask(q);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          question: q,
          answer: res.answer || "I don't know. This information is not available in the SOP.",
          sources: res.sources || []
        };
        return updated;
      });
    } catch (e) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          question: q,
          answer: "Error while answering. Please try again.",
          sources: []
        };
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className="chat-pair">
            <div className="user-msg">
              <strong>You</strong>
              <p>{m.question}</p>
            </div>

            <div className="ai-msg">
              <strong>OpsMind AI</strong>
              <p>{m.answer}</p>
            </div>
          </div>
        ))}

        {loading && <p className="thinking">🤖 Thinking…</p>}
      </div>

      <div className="chat-input">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about SOPs, policies, workflows…"
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
