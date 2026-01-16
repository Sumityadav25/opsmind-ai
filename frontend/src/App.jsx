import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import "./App.css";

/* ===== JWT Decode Safe ===== */
function getUserFromToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return { role: payload.role };
  } catch {
    return null;
  }
}

/* ===== Protected Route ===== */
function ProtectedRoute({ children, adminOnly = false }) {
  const user = getUserFromToken();

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/chat" />;
  }

  return children;
}

function AppContent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  const handleAuthSuccess = (data) => {
    localStorage.setItem("token", data.token);
    setUser({ role: data.role });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="App">
      {user && (
        <nav className="premium-nav">
          <div className="nav-brand">
            <span className="logo">🧠 OpsMind AI</span>
            <span className="tagline">Enterprise Knowledge Brain</span>
          </div>

          <div className="nav-user">
            {isAdmin && (
              <a href="/admin" className="admin-btn">
                ⚙️ Admin Panel
              </a>
            )}
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout ({user.role})
            </button>
          </div>
        </nav>
      )}

      <Routes>
        <Route
          path="/login"
          element={!user ? <AuthForm type="login" onSuccess={handleAuthSuccess} /> : <Navigate to="/chat" />}
        />

        <Route
          path="/signup"
          element={!user ? <AuthForm type="signup" onSuccess={handleAuthSuccess} /> : <Navigate to="/chat" />}
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
