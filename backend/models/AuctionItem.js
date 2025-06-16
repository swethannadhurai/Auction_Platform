const mongoose = require("mongoose");

const auctionItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startingBid: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
   /* product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },*/
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    status: {
       type: String,
       enum: ["pending", "active", "completed"], 
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("AuctionItem", auctionItemSchema);

