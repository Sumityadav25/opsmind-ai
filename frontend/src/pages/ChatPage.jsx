import ChatBox from "../components/ChatBox";

export default function ChatPage() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>OpsMind AI</h1>
        <p>Enterprise SOP Assistant</p>
      </header>

      <ChatBox />
    </div>
  );
}
