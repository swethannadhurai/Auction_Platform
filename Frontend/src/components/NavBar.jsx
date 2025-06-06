import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-xl font-bold text-yellow-500" to="/">
          BidBud
        </Link>
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 mt-4 lg:mt-0">
            <li>
              <Link className="text-white hover:text-gray-300 text-lg" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/auctions"
              >
                Auctions
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    className="text-white hover:text-gray-300 text-lg"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white hover:text-gray-300 text-lg"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="text-white hover:text-gray-300 text-lg"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                {user?.role === "seller" && (
                  <li>
                    <Link
                      className="text-white hover:text-gray-300 text-lg"
                      to="/seller-dashboard"
                    >
                      Seller Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-300 text-lg"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
