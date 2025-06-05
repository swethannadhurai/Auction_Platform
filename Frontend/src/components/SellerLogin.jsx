import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SellerLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(
				"https://auction-platform-ett9.onrender.com/api/auth/login-seller",
				{ email, password },
				{ withCredentials: true }
			);
			if (res.status === 200) {
				login();
				navigate("/seller-dashboard");
			}
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-800">
			<div className="w-full max-w-md p-8 bg-gray-900 rounded shadow-md">
				<h2 className="text-2xl text-white font-bold text-center mb-6">Seller Login</h2>
				<form onSubmit={handleLogin} className="space-y-4">
					<div className="flex items-center border rounded-md bg-gray-700">
						<FiMail className="w-6 h-6 text-gray-400 ml-3" />
						<input
							type="email"
							placeholder="Seller Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-2 bg-gray-700 text-white focus:outline-none"
							required
						/>
					</div>
					<div className="flex items-center border rounded-md bg-gray-700">
						<FiLock className="w-6 h-6 text-gray-400 ml-3" />
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-2 bg-gray-700 text-white focus:outline-none"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
						disabled={loading}
					>
						{loading ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" /> : "Login as Seller"}
					</button>
				</form>
				{error && <p className="text-red-400 mt-4 text-center">{error}</p>}
			</div>
		</div>
	);
}

export default SellerLogin;
