const mongoose = require("mongoose");

const auctionItemSchema = mongoose.Schema({
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

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  },

  status: {
    type: String,
    enum: ['upcoming', 'live', 'ended'],
    default: 'upcoming'
  },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: new Date(new Date().getTime()),
	},
	updatedAt: {
		type: Date,
		default: new Date(new Date().getTime()),
	},
	image: {
		type: String,
	}
});

module.exports = mongoose.model("AuctionItem", auctionItemSchema);
