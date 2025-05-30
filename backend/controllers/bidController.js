const Bid = require("../models/Bid");
const AuctionItem = require("../models/AuctionItem");
const jwt = require("jsonwebtoken");

const placeBid = async (req, res) => {
	const { auctionItemId, bidAmount } = req.body;
	const userId = req.user.id;

	if (!auctionItemId || !bidAmount || bidAmount <= 0) {
		return res.status(400).json({ message: "Invalid bid details" });
	}

	try {
		const auctionItem = await AuctionItem.findById(auctionItemId);

		if (!auctionItem) {
			return res.status(404).json({ message: "Auction item not found" });
		}

		
		const highestBid = await Bid.find({ auctionItemId })
			.sort({ bidAmount: -1 })
			.limit(1);

		const currentHighest = highestBid.length > 0 ? highestBid[0].bidAmount : auctionItem.startingBid;

		if (bidAmount <= currentHighest) {
			return res.status(400).json({
				message: `Your bid must be higher than the current highest bid of $${currentHighest}`,
			});
		}

		const newBid = await Bid.create({
			auctionItemId,
			userId,
			bidAmount,
		});

		res.status(201).json(newBid);
	} catch (error) {
		console.error("Bid Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};


const getBidHistory = async (req, res) => {
	const { auctionItemId } = req.params;

	if (!auctionItemId) {
		return res.status(400).json({ message: "Auction item ID is required" });
	}

	try {
		const bids = await Bid.find({ auctionItemId }).populate(
			"userId",
			"username"
		);
		res.status(200).json(bids);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
 
const getBidsByUser = async (req, res) => {
	try {
		const userId = req.user.id; 

		let bids = await Bid.find({ userId });
		bids = await Promise.all(
			bids.map(async (bid) => {
				const auctionItem = await AuctionItem.findById(bid.auctionItemId);
				const bidObject = bid.toObject();
				delete bidObject.auctionItemId;
				return {
					...bidObject,
					auctionItem,
				};
			})
		);

		res.status(200).json({ bids });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};


module.exports = {
	placeBid,
	getBidHistory,
	getBidsByUser,
};