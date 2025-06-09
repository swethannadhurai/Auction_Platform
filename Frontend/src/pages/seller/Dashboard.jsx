import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get(
          "https://auction-platform-ett9.onrender.com/api/seller/dashboard",
          { withCredentials: true }
        );
        setStats(res.data);
      } catch (err) {
        setError("Failed to load dashboard stats.");
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Seller Dashboard</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : !stats ? (
        <p className="text-gray-600">Loading dashboard stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm text-gray-500">Total Products</h3>
            <p className="text-2xl font-bold text-indigo-600">{stats.productCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm text-gray-500">Total Auctions</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.auctionCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm text-gray-500">Active Auctions</h3>
            <p className="text-2xl font-bold text-green-600">{stats.activeAuctions}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm text-gray-500">Ended Auctions</h3>
            <p className="text-2xl font-bold text-red-600">{stats.endedAuctions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
