import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function StartAuctionForm() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    startingBid: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic date validation
    if (new Date(form.startTime) >= new Date(form.endTime)) {
      alert("End time must be later than start time.");
      return;
    }

    try {
      await axios.post(
        `https://auction-platform-ett9.onrender.com/api/seller/inventory/${productId}/auctions`,
        {
          startingBid: Number(form.startingBid),
          startTime: form.startTime,
          endTime: form.endTime,
        },
        { withCredentials: true }
      );

      alert("Auction listed successfully!");
      navigate("/seller-dashboard/auctions");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        err.response?.data?.message || "Failed to create auction. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🎯 List Product for Auction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Starting Bid (₹)</label>
          <input
            type="number"
            name="startingBid"
            value={form.startingBid}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Create Auction
        </button>
      </form>
    </div>
  );
}

export default StartAuctionForm;
