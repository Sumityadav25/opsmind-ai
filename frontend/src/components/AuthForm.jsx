import { useState } from "react";
import { login, signup } from "../services/api";

export default function AuthForm({ type, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !password || (type === "signup" && !name)) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const data =
        type === "login"
          ? await login({ email, password })
          : await signup({ name, email, password, role: "ADMIN" });

      console.log("AUTH RESPONSE:", data);

      if (!data || !data.token) {
        alert(data?.message || "Authentication failed");
        setLoading(false);
        return;
      }

      // 🔐 Save token
      localStorage.setItem("token", data.token);

      // 🔁 Update app state
      onSuccess(data);

      // 🚀 FORCE REDIRECT (IMPORTANT)
      if (data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/chat";
      }

    } catch (err) {
      console.error("FETCH ERROR FULL:", err);
      alert(err.message || "Network / Server error");
    }


    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{type === "login" ? "Login to OpsMind" : "Create Account"}</h2>

        {type === "signup" && (
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={submit} disabled={loading}>
          {loading ? "Please wait..." : type === "login" ? "Login" : "Create Account"}
        </button>

        {type === "login" ? (
          <p style={{ marginTop: "15px" }}>
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        ) : (
          <p style={{ marginTop: "15px" }}>
            Already have an account? <a href="/login">Login</a>
          </p>
        )}
      </div>
    </div>
  );
}
