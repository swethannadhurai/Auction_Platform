import { useEffect, useState } from "react";
import axios from "axios";

function ManageAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get(`https://auction-platform-ett9.onrender.com/api/seller/auctions`, {
          withCredentials: true,
        });
        setAuctions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Failed to fetch auctions");
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 Manage Auctions</h2>

      {loading ? (
        <p className="text-gray-600">Loading auctions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : auctions.length === 0 ? (
        <p className="text-gray-600">No auctions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <div
              key={auction._id}
              className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {auction.image && (
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-900">{auction.title}</h3>
              <p className="text-gray-700">Starting Bid: ₹{auction.startingBid}</p>
              <p className="text-gray-700">Ends On: {new Date(auction.endDate).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageAuctions;

