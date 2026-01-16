const API_BASE = "http://127.0.0.1:5000/api";

// ================= AUTH =================
export const signup = async (data) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("LOGIN STATUS:", res.status);

    const json = await res.json();
    console.log("LOGIN RESPONSE:", json);

    return json;
  } catch (e) {
    console.error("LOGIN FETCH FAILED:", e);
    throw e;
  }
};

// ================= RAG ASK =================
export const ask = async (question) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ question }),
  });

  return res.json();
};

// ================= CHAT HISTORY =================
export const getHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/ask/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};


// ================= CLEAR CHAT =================
export const clearHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/ask/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// ================= ADMIN =================
export const uploadPDF = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://127.0.0.1:5000/api/upload/user", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json();
};

