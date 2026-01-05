import { useEffect, useState } from "react";
import { askQuestion, getHistory, clearHistory } from "../services/api";
import Message from "./Message";
import SourceList from "./SourceList";
import Loader from "./Loader";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState([]);

  // Load history
  useEffect(() => {
    async function load() {
      try {
        const history = await getHistory();
        const formatted = history.flatMap((h) => [
          { role: "user", text: h.question },
          { role: "ai", text: h.answer },
        ]);
        setMessages(formatted);
      } catch {
        console.warn("History skipped");
      }
    }
    load();
  }, []);

  async function handleAsk() {
    if (!question.trim() || loading) return;

    setMessages((m) => [...m, { role: "user", text: question }]);
    setQuestion("");
    setLoading(true);
    setSources([]);

    try {
      const data = await askQuestion(question);
      setMessages((m) => [...m, { role: "ai", text: data.answer }]);
      setSources(data.sources || []);
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleClear() {
    await clearHistory();
    setMessages([]);
    setSources([]);
  }

  return (
    <div className="chat-card">
      <button
        onClick={handleClear}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Clear Chat
      </button>

      <div className="messages">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} />
        ))}
        {loading && <Loader />}
      </div>

      {sources.length > 0 && <SourceList sources={sources} />}

      <div className="input-area">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about SOPs..."
          disabled={loading}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
        />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
  );
}
