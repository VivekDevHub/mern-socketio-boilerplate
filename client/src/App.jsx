import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import SocketPage from "./pages/SocketPage";
import api from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        // Invalid token or not authenticated
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/socket"
          element={
            <ProtectedRoute>
              <SocketPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
