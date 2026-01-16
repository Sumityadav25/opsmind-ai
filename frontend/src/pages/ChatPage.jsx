import ChatBox from "../components/ChatBox";
import SourceList from "../components/SourceList";
import "../styles/chat.css";

export default function ChatPage() {
  return (
    <div className="chat-layout">
      {/* LEFT */}
      <aside className="chat-sidebar">
        <h3>💬 OpsMind Chats</h3>
        <p className="muted">Enterprise SOP Assistant</p>

        <button
          className="clear-btn"
          onClick={() => window.location.reload()}
        >
          🧹 Clear Chat
        </button>
      </aside>

      {/* CENTER */}
      <main className="chat-main">
        <ChatBox />
      </main>

      {/* RIGHT */}
      <aside className="chat-sources">
        <h3>📄 Sources</h3>
        <SourceList />
      </aside>
    </div>
  );
}
