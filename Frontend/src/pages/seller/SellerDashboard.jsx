import { Link, Outlet } from "react-router-dom";

function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6 border-r border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
        <nav className="flex flex-col gap-4 mt-4">
          <Link
            to="create-product"
            className="text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 px-4 py-2 rounded-lg transition"
          >
            ➕ Create Product
          </Link>
          <Link
            to="inventory"
            className="text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 px-4 py-2 rounded-lg transition"
          >
            ✏️ Edit/Delete Product
          </Link>
          <Link
            to="auctions"
            className="text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 px-4 py-2 rounded-lg transition"
          >
            📦 Manage Auctions
          </Link>
          <Link
            to="inventory"
            className="text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 px-4 py-2 rounded-lg transition"
          >
            📋 View Inventory
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SellerDashboard;

