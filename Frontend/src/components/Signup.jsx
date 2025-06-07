import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Signup() {
  const [role, setRole] = useState("user"); // user or seller
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint =
        role === "seller"
          ? "https://auction-platform-ett9.onrender.com/api/seller/register"
          : "https://auction-platform-ett9.onrender.com/api/users/register";

      const res = await axios.post(
        endpoint,
        { name, email, password },
        { withCredentials: true }
      );

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSignup}
        className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md text-white space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <div className="mb-2">
          <label className="text-white mr-4">Sign up as:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-2 py-1 rounded bg-gray-600 text-white border border-gray-500"
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div className="flex items-center border rounded-md border-gray-600 bg-gray-600">
          <FiUser className="w-5 h-5 ml-3 text-gray-300" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-600 text-white focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border rounded-md border-gray-600 bg-gray-600">
          <FiMail className="w-5 h-5 ml-3 text-gray-300" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-600 text-white focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border rounded-md border-gray-600 bg-gray-600">
          <FiLock className="w-5 h-5 ml-3 text-gray-300" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-600 text-white focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 py-2 rounded hover:bg-indigo-600"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin w-5 h-5 mx-auto" />
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-sm text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-300 hover:underline">
            Login
          </Link>
        </p>

        {error && <div className="text-red-300 text-sm text-center">{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
