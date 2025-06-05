import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SellerSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://auction-platform-ett9.onrender.com/api/auth/register-seller",
        { name, email, password }
      );

      if (res.status === 201) {
        setSuccess("Seller registered successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/seller-login");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded shadow-md">
        <h2 className="text-2xl text-white font-bold text-center mb-6">Seller Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex items-center border rounded-md bg-gray-700">
            <FiUser className="w-6 h-6 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-md bg-gray-700">
            <FiMail className="w-6 h-6 text-gray-400 ml-3" />
            <input
              type="email"
              placeholder="Email"
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
              minLength={6}
            />
          </div>

          <div className="flex items-center border rounded-md bg-gray-700">
            <FiLock className="w-6 h-6 text-gray-400 ml-3" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white focus:outline-none"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" /> : "Signup as Seller"}
          </button>
        </form>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-400 mt-4 text-center">{success}</p>}

        <p className="mt-4 text-white text-center">
          Already have an account?{" "}
          <Link to="/seller-login" className="text-indigo-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SellerSignup;
