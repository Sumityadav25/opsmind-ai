import { useState } from "react";
import { uploadPDF } from "../services/api";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    const res = await uploadPDF(file);
    setMsg(res.message || "Uploaded");
  };

  return (
    <div>
      <h2>Admin Panel – Upload SOP</h2>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
      <p>{msg}</p>
    </div>
  );
}
