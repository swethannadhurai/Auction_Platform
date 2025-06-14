import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditAuctionItem = () => {
  const { id } = useParams();
  const [auctionItem, setAuctionItem] = useState({
    title: "",
    description: "",
    startingBid: "",
    endDate: "",
    seller: "",
    product: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctionItem = async () => {
      try {
        const res = await axios.get(
          `https://auction-platform-ett9.onrender.com/api/auctions/${id}`,
          { withCredentials: true }
        );

        const item = res.data;
        const formattedDate = new Date(item.endDate).toISOString().slice(0, 16);

        console.log("Fetched auction item:", item); // Debugging

        setAuctionItem({
          title: item.title || "",
          description: item.description || "",
          startingBid: item.startingBid || "",
          endDate: formattedDate,
          seller: item.seller,     // Don't overwrite with empty string
          product: item.product,   // Don't overwrite with empty string
        });
      } catch (error) {
        console.error("Error fetching auction item:", error);
      }
    };

    fetchAuctionItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuctionItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItem = {
      title: auctionItem.title,
      description: auctionItem.description,
      startingBid: Number(auctionItem.startingBid),
      endDate: new Date(auctionItem.endDate).toISOString(),
      seller: auctionItem.seller,     // Must be valid
      product: auctionItem.product,   // Must be valid
    };

    try {
      console.log("Updated Item Data:", updatedItem); // Debugging

      await axios.put(
        `https://auction-platform-ett9.onrender.com/api/auctions/${id}`,
        updatedItem,
        { withCredentials: true }
      );
      navigate(`/auction/${id}`);
    } catch (error) {
      console.error("Error updating auction item:", error);
      if (error.response?.data) {
        console.error("Backend response:", error.response.data);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Edit Auction Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={auctionItem.title}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={auctionItem.description}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
            rows="4"
          />
        </div>
        <div>
          <label htmlFor="startingBid" className="block text-lg mb-2">
            Starting Bid
          </label>
          <input
            type="number"
            id="startingBid"
            name="startingBid"
            value={auctionItem.startingBid}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-lg mb-2">
            End Date
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={auctionItem.endDate}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
        >
          Update Auction Item
        </button>
      </form>
    </div>
  );
};

export default EditAuctionItem;
