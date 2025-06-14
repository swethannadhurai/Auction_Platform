import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditAuctionItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [auctionItem, setAuctionItem] = useState({
    title: "",
    description: "",
    startingBid: "",
    endDate: "",
    seller: "",
    product: "",
  });

  useEffect(() => {
    const fetchAuctionItem = async () => {
      try {
        const res = await axios.get(
          `https://auction-platform-ett9.onrender.com/api/auctions/${id}`,
          { withCredentials: true }
        );
        const item = res.data;

        console.log("Fetched auction item:", item); // ✅ Debug log

        setAuctionItem({
          title: item.title || "",
          description: item.description || "",
          startingBid: item.startingBid || "",
          endDate: new Date(item.endDate).toISOString().slice(0, 16),
          seller: item.seller?._id || item.seller || "",
          product: item.product?._id || item.product || "",
        });
      } catch (err) {
        console.error("Error fetching auction item:", err);
      }
    };

    fetchAuctionItem();
  }, [id]);

  const handleChange = (e) => {
    setAuctionItem({ ...auctionItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updated Item Data:", auctionItem);

      const res = await axios.put(
        `https://auction-platform-ett9.onrender.com/api/auctions/${id}`,
        auctionItem,
        { withCredentials: true }
      );
      console.log("Auction item updated:", res.data);
      navigate("/seller/manage-auctions");
    } catch (err) {
      console.error("Error updating auction item:", err);
      if (err.response) {
        console.error("Backend response:", err.response.data);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Auction Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={auctionItem.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={auctionItem.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Starting Bid</label>
          <input
            type="number"
            name="startingBid"
            value={auctionItem.startingBid}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={auctionItem.endDate}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        {/* Hidden fields for seller and product */}
        <input type="hidden" name="seller" value={auctionItem.seller} />
        <input type="hidden" name="product" value={auctionItem.product} />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Update Auction Item
        </button>
      </form>
    </div>
  );
};

export default EditAuctionItem;

