import { useState } from "react";
import Modal from "./Modal";

export default function SourceList({ sources }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="sources">
      <h4>Sources</h4>
      <ul>
        {sources.map((src, i) => (
          <li key={i}>
            <button className="link" onClick={() => setSelected(src)}>
              {src.documentName} | Chunk {src.chunkId} | Score {src.score}
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <Modal
          title="SOP Reference"
          onClose={() => setSelected(null)}
        >
          <p><strong>Document:</strong> {selected.documentName}</p>
          <p><strong>Chunk ID:</strong> {selected.chunkId}</p>
          <p><strong>Similarity Score:</strong> {selected.score}</p>
          <p style={{ marginTop: "10px", color: "#666" }}>
            (Chunk text preview will be added in next iteration)
          </p>
        </Modal>
      )}
    </div>
  );
}
