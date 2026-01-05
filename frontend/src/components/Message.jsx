export default function Message({ role, text }) {
  if (!text) return null;

  return (
    <div className={`message ${role}`}>
      <p>{text}</p>
    </div>
  );
}
