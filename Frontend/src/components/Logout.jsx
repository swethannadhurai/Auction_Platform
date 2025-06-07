import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function Logout() {
	const navigate = useNavigate();
	const { user, logout: signout } = useAuth(); 

	useEffect(() => {
		const logout = async () => {
			try {
				const role = user?.role || "user"; 

				const logoutUrl =
					role === "seller"
						? "https://auction-platform-ett9.onrender.com/api/sellers/logout"
						: "https://auction-platform-ett9.onrender.com/api/users/logout";

				await axios.get(logoutUrl, {
					withCredentials: true,
				});

			
				document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
				
				signout();
				navigate("/login");
			} catch (err) {
				console.error("Logout failed:", err);
			}
		};

		logout();
	}, [navigate, signout, user]);

	return <div>Logging out...</div>;
}

export default Logout;
