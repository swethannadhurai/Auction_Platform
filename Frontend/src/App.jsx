import { Routes, Route } from "react-router-dom";
import AuctionList from "./components/AuctionList";
import AuctionItem from "./components/AuctionItem";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import BidForm from "./components/BidForm";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/index";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import CreateAuctionItem from "./components/CreateAuctionItem";
import EditAuctionItem from "./components/EditAuctionItem";

import SellerDashboard from "./pages/seller/SellerDashboard";
import CreateProduct from "./pages/seller/CreateProduct";
import EditProduct from "./pages/seller/EditProduct";
import ManageAuctions from "./pages/seller/ManageAuctions";
import Inventory from "./pages/seller/Inventory";

function AppRoutes() {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center mt-10 text-white">
        Checking authentication...
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/auctions" element={<AuctionList />} />

          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction/:id"
            element={
              <ProtectedRoute>
                <AuctionItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction/create"
            element={
              <ProtectedRoute>
                <CreateAuctionItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction/edit/:id"
            element={
              <ProtectedRoute>
                <EditAuctionItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction/bid/:id"
            element={
              <ProtectedRoute>
                <BidForm />
              </ProtectedRoute>
            }
          />

        
          <Route
               path="/seller-dashboard"
                element={
                    <ProtectedRoute allowedRoles={["seller"]}>
                      <SellerDashboard />
                    </ProtectedRoute>
               }
          >

          <Route
                index
                  element={
                  <ProtectedRoute allowedRoles={["seller"]}>
                       <Inventory />
                 </ProtectedRoute>
                 }
          />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="edit-product" element={<EditProduct />} />
          <Route path="auctions" element={<ManageAuctions />} />
          <Route path="inventory" element={<Inventory />} />
      </Route>

    </Routes>
  </div>

      
      {isLoggedIn && user && (
        <div className="fixed bottom-0 right-0 bg-gray-800 text-white p-2 text-sm z-50">
          Logged in as: {user.role}
        </div>
      )}
    </>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
