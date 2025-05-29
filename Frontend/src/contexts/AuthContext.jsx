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

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => setIsLoggedIn(true);
	const logout = () => setIsLoggedIn(false);

	useEffect(() => {
		// Optional: Load from localStorage or cookies if needed
		// setIsLoggedIn(!!localStorage.getItem("token"));
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
