import { Link, Outlet } from "react-router-dom";

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white p-6 shadow-md">
          <nav className="space-y-4">
            <Link
              to="inventory"
              className="block px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Inventory
            </Link>
            <Link
              to="create-product"
              className="block px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Create Product
            </Link>
            <Link
              to="edit-product"
              className="block px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Edit Product
            </Link>
            <Link
              to="auctions"
              className="block px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Manage Auctions
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}









