import { useState } from "react";
import { uploadPDF } from "../services/api";

export default function AdminPanel() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    const res = await uploadPDF(file);
    setMsg(res.message || "Uploaded successfully");
  };

  return (
    <div className="admin-panel">
      <h2>⚙️ OpsMind Admin</h2>
      <p>Upload SOP PDFs to train the AI</p>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload SOP</button>
      <p>{msg}</p>
    </div>
  );
}
