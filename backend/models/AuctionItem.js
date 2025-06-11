const mongoose = require("mongoose");

const auctionItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // 🔗 Link to product from inventory
    required: true,
    unique: true, // ⛔ Prevent multiple auctions for the same product
  },
  startingBid: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "live", "ended"],
    default: "upcoming",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller", // 🧑‍💼 Should point to seller, not general user
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("AuctionItem", auctionItemSchema);
