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