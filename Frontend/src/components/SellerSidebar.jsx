import { Link } from "react-router-dom";

const SellerSidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <Link to="create-product" className="hover:bg-gray-700 p-2 rounded">Create Product</Link>
        <Link to="edit-product" className="hover:bg-gray-700 p-2 rounded">Edit Product</Link>
        <Link to="auctions" className="hover:bg-gray-700 p-2 rounded">Manage Auctions</Link>
        <Link to="inventory" className="hover:bg-gray-700 p-2 rounded">Inventory</Link>
      </nav>
    </aside>
  );
};

export default SellerSidebar;

