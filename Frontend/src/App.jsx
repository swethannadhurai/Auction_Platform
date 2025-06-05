import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/index";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AuctionList from "./components/AuctionList";
import AuctionItem from "./components/AuctionItem";
import BidForm from "./components/BidForm";
import CreateAuctionItem from "./components/CreateAuctionItem";
import EditAuctionItem from "./components/EditAuctionItem";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

import SellerSignup from "./components/SellerSignup";
import SellerLogin from "./components/SellerLogin";
import SellerDashboard from "./pages/seller/SellerDashboard";
import CreateProduct from "./pages/seller/CreateProduct";
import EditProduct from "./pages/seller/EditProduct";
import ManageAuctions from "./pages/seller/ManageAuctions";
import Inventory from "./pages/seller/Inventory";

function AppRoutes() {
  const { user, isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    const jwtToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (jwtToken) {
      login();
    } else {
      logout();
    }
  }, []); // ✅ only once on mount

  console.log("Logged-in user:", user);
  console.log("User role:", user?.role);

  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/auctions" element={<AuctionList />} />
          <Route
            path="/auction/:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <AuctionItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction/create"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <CreateAuctionItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <EditAuctionItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction/bid/:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <BidForm />
              </ProtectedRoute>
            }
          />

          {/* Seller Auth Routes */}
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/seller-login" element={<SellerLogin />} />

          {/* Seller Protected Routes */}
          <Route
            path="/seller"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          >
            <Route
              path="create-product"
              element={
                <ProtectedRoute allowedRoles={["seller"]}>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-product"
              element={
                <ProtectedRoute allowedRoles={["seller"]}>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="auctions"
              element={
                <ProtectedRoute allowedRoles={["seller"]}>
                  <ManageAuctions />
                </ProtectedRoute>
              }
            />
            <Route
              path="inventory"
              element={
                <ProtectedRoute allowedRoles={["seller"]}>
                  <Inventory />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>

      {/* Debugging Footer */}
      {isLoggedIn && user && (
        <div className="fixed bottom-0 right-0 bg-gray-800 text-white p-2 text-sm z-50">
          Logged in as: {user.role}
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

