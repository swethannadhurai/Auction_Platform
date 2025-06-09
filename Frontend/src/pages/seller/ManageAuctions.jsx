import { useEffect, useState } from "react";
import axios from "axios";

const ManageAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/seller/auctions", {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAuctions(res.data);
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Unauthorized or failed to fetch auctions");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Auctions</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : auctions.length === 0 ? (
        <p>No auctions found.</p>
      ) : (
        <ul className="space-y-4">
          {auctions.map((auction) => (
            <li key={auction._id} className="border p-4 rounded bg-gray-800">
              <h3 className="font-semibold">{auction.title}</h3>
              <p>Status: {auction.status}</p>
              <p>Ends at: {new Date(auction.endTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageAuctions;


