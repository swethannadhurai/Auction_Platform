import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("user");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth(); 

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const loginUrl =
				role === "seller"
					? "https://auction-platform-ett9.onrender.com/api/auth/login-seller"
					: "https://auction-platform-ett9.onrender.com/api/users/login";

			const res = await axios.post(
				loginUrl,
				{ email, password },
				{ withCredentials: true }
			);

			if (res.status === 200) {
				const userData = res.data.user;
				login(userData); 
				navigate(userData.role === "seller" ? "/seller" : "/profile"); 
			}
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="flex items-center justify-center min-h-screen bg-gray-700 bg-cover bg-center"
			style={{
				backgroundImage:
					"url('https://source.unsplash.com/1600x900/?technology,login')",
			}}
		>
			<div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
				<h2 className="mb-6 text-3xl font-semibold text-white text-center">
					Login
				</h2>
				<form onSubmit={handleLogin} className="space-y-4">
					
					<div className="mb-4">
						<label className="text-white mr-4">Login as:</label>
						<select
							value={role}
							onChange={(e) => setRole(e.target.value)}
							className="px-2 py-1 rounded bg-gray-700 text-white border border-gray-600"
						>
							<option value="user">User</option>
							<option value="seller">Seller</option>
						</select>
					</div>

					
					<div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
						<FiMail className="w-6 h-6 text-gray-400 ml-3" />
						<input
							type="email"
							className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					
					<div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
						<FiLock className="w-6 h-6 text-gray-400 ml-3" />
						<input
							type="password"
							className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="flex items-center justify-between mt-4">
						<p className="text-white">
							Don{"'"}t have an account?{" "}
							<Link to="/signup" className="text-indigo-300 hover:underline">
								Signup
							</Link>
						</p>
						<button
							type="submit"
							className="px-6 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							disabled={loading}
						>
							{loading ? (
								<AiOutlineLoading3Quarters className="w-6 h-6 animate-spin mx-auto" />
							) : (
								"Login"
							)}
						</button>
					</div>
				</form>

				{error && (
					<div className="mt-4 text-red-300 text-center">{error}</div>
				)}
			</div>
		</div>
	);
}

export default Login;
