import { useEffect, useState } from "react";
import { uploadPDF } from "../services/api";

const API = "http://127.0.0.1:5000/api";

export default function SourceList() {
  const [docs, setDocs] = useState([]);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const loadDocs = async () => {
    const res = await fetch(`${API}/upload/list`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setDocs(data);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const upload = async () => {
    if (!file) return alert("Select PDF");
    await uploadPDF(file);
    setFile(null);
    loadDocs();
  };

  const remove = async (doc) => {
    await fetch(`${API}/upload/${doc}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    loadDocs();
  };

  return (
    <div>
      {/* Upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={upload} style={{ marginTop: 8 }}>
        Upload PDF
      </button>

      <hr style={{ margin: "15px 0", opacity: 0.2 }} />

      {/* List */}
      {docs.length === 0 && (
        <p style={{ opacity: 0.6 }}>No PDFs uploaded</p>
      )}

      {docs.map(doc => (
        <div key={doc} style={{ marginBottom: 10 }}>
          📄 {doc}
          <button
            onClick={() => remove(doc)}
            style={{
              float: "right",
              background: "red",
              border: "none",
              color: "white",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}
