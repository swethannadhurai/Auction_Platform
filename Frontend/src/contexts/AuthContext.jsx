/*import { createContext, useContext } from "react";

export const AuthContext = createContext({
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = AuthContext.Provider;*/

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://auction-platform-ett9.onrender.com";

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/api/auth/me`, {
					withCredentials: true,
				});
				setUser(res.data);
				setIsLoggedIn(true);
				console.log("Logged in user:", res.data);
			} catch (error) {
				console.error("User auth check failed:", error.response?.data || error.message);
				setUser(null);
				setIsLoggedIn(false);
			}
		};

		fetchUser();
	}, []);

	const login = () => setIsLoggedIn(true);
	const logout = () => {
		setIsLoggedIn(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

