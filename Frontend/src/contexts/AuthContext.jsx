// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://auction-platform-ett9.onrender.com/api/auth/me`,
          { withCredentials: true }
        );

        const userData = res.data.user || res.data; // safe fallback
        setUser(userData);
        setRole(userData.role || null);
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
        setRole(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    if (!userData) return;
    setIsLoggedIn(true);
    setUser(userData);
    setRole(userData.role || null);
  };

  const logout = async () => {
    try {
      await axios.post(
        `https://auction-platform-ett9.onrender.com/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggedIn(false);
      setUser(null);
      setRole(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, role, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
