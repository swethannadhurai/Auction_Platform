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

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(
					"https://auction-platform-ett9.onrender.com/api/auth/me",
					{ withCredentials: true }
				);
				setUser(res.data); 
				setIsLoggedIn(true);
			} catch (error) {
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
