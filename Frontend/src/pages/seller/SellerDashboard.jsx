// inside SellerDashboard.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

function SellerDashboard() {
  return (
    <div>
      <h1>Seller Dashboard</h1>
      <nav>
        <Link to="inventory">Inventory</Link> |{" "}
        <Link to="create-product">Create Product</Link> |{" "}
        <Link to="edit-product">Edit Product</Link> |{" "}
        <Link to="auctions">Manage Auctions</Link>
      </nav>

      {/* Nested routes will render here */}
      <Outlet />
    </div>
  );
}

export default SellerDashboard;






