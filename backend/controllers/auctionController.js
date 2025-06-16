const AuctionItem = require("../models/AuctionItem");
const Bid = require("../models/Bid");
const User = require("../models/User");

const createAuctionItem = async (req, res) => {
  const { title, description, startingBid, endDate } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const newDate = new Date(endDate);
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const auctionItem = await AuctionItem.create({
      title,
      description,
      startingBid,
      image: imagePath,
      endDate: newDate,
      createdBy: req.user.id,
      seller: req.user._id,
      status: 'active'
    });

    res.status(201).json(auctionItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAuctionItems = async (req, res) => {
  try {
    const auctionItems = await AuctionItem.find();
    res.status(200).json(auctionItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAuctionItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const auctionItem = await AuctionItem.findById(id)
      .populate("seller", "_id name email") 
      .populate("product", "_id name");

    if (!auctionItem) {
      return res.status(404).json({ message: "Auction item not found" });
    }

    res.status(200).json(auctionItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getAuctionItemsByUser = async (req, res) => {
  try {
    const auctionItems = await AuctionItem.find({ createdBy: req.user._id });
    res.status(200).json({ auctionItems });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateAuctionItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, startingBid, endDate } = req.body;
  const userId = req.user.id;

  try {
    const auctionItem = await AuctionItem.findById(id);

    if (!auctionItem) {
      return res.status(404).json({ message: "Auction item not found" });
    }

    if (auctionItem.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    if (title) auctionItem.title = title;
    if (description) auctionItem.description = description;
    if (startingBid !== undefined) auctionItem.startingBid = startingBid;
    if (endDate) auctionItem.endDate = new Date(endDate);

    auctionItem.updatedAt = new Date();

    if (!auctionItem.seller) {
      return res.status(400).json({ message: "Missing required field: seller" });
    }

    await auctionItem.save();
    res.json(auctionItem);
  } catch (error) {
    console.error("Error updating auction item:", error);
    res.status(500).json({ message: error.message });
  }
};


const deleteAuctionItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const auctionItem = await AuctionItem.findById(id);
    if (!auctionItem) {
      return res.status(404).json({ message: "Auction item not found" });
    }

    if (auctionItem.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await Bid.deleteMany({ auctionItemId: id });
    await auctionItem.remove();

    res.json({ message: "Auction item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAuctionWinner = async (req, res) => {
  const auctionId = req.params.id;

  try {
    const auctionItem = await AuctionItem.findById(auctionId);
    if (!auctionItem) {
      return res.status(404).json({ winner: "", message: "Auction item not found" });
    }

    if (new Date(auctionItem.endDate) > new Date()) {
      return res.status(200).json({ winner: "", message: "Auction has not ended yet" });
    }

    const bids = await Bid.find({ auctionItemId: auctionId });
    if (bids.length === 0) {
      return res.status(200).json({ winner: "", message: "No bids found" });
    }

    const highestBid = bids.reduce((max, bid) =>
      bid.bidAmount > max.bidAmount ? bid : max, bids[0]);

    const winner = await User.findById(highestBid.userId);
    if (!winner) {
      return res.status(404).json({ winner: "", message: "Winner not found" });
    }

    res.status(200).json({ winner });
  } catch (error) {
    console.error("Error fetching auction winner:", error);
    res.status(500).json({ message: error.message });
  }
};


const getAuctionsWonByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const bidsByUser = await Bid.find({ userId });
    const auctionIds = bidsByUser.map((bid) => bid.auctionItemId.toString());
    const uniqueAuctionIds = [...new Set(auctionIds)];

    let wonAuctions = [];

    for (const auctionItemId of uniqueAuctionIds) {
      const bids = await Bid.find({ auctionItemId });
      if (!bids.length) continue;

      const winningBid = bids.reduce((max, bid) =>
        bid.bidAmount > max.bidAmount ? bid : max, bids[0]);

      const auctionItem = await AuctionItem.findById(auctionItemId);
      if (!auctionItem) continue;

      const isAuctionEnded = new Date(auctionItem.endDate) <= new Date();

      if (isAuctionEnded && winningBid.userId.toString() === userId.toString()) {
        wonAuctions.push({
          auctionId: auctionItemId,
          title: auctionItem.title,
          description: auctionItem.description,
          winningBid: winningBid.bidAmount,
          endDate: auctionItem.endDate,
        });
      }
    }

    res.status(200).json({ wonAuctions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAuctionItem,
  getAuctionItems,
  updateAuctionItem,
  deleteAuctionItem,
  getAuctionItemById,
  getAuctionItemsByUser,
  getAuctionWinner,
  getAuctionsWonByUser,
};
