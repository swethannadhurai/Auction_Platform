import { useEffect, useState } from "react";
import axios from "axios";

const ManageAuctions = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    axios.get("/api/seller/auctions", { withCredentials: true }).then((res) => {
      setAuctions(res.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Auctions</h2>
      {auctions.length === 0 ? (
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
