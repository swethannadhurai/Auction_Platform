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
        setUser(res.data);
        setRole(res.data.role);
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
    setIsLoggedIn(true);
    setUser(userData);
    setRole(userData.role);
  };

  const logout = async () => {
    try {
      await axios.post(
        `https://auction-platform-ett9.onrender.com/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUser(null);
      setRole(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
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
