import { Link } from 'react-router-dom';

function SellerSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold">Seller Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/seller-dashboard/create-product" className="hover:bg-gray-700 p-2 rounded">Create Product</Link>
        <Link to="/seller-dashboard/edit-product" className="hover:bg-gray-700 p-2 rounded">Edit/Delete Products</Link>
        <Link to="/seller-dashboard/auctions" className="hover:bg-gray-700 p-2 rounded">Manage Auctions</Link>
        <Link to="/seller-dashboard/inventory" className="hover:bg-gray-700 p-2 rounded">View Inventory</Link>
      </nav>
    </aside>
  );
}

export default SellerSidebar;
