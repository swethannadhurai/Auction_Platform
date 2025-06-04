// server/controllers/dashboardController.js
const Product = require('../models/Product');
const Auction = require('../models/AuctionItem');

// Get dashboard stats for the seller
const getDashboardStats = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const productCount = await Product.countDocuments({ seller: sellerId });
    const auctionCount = await Auction.countDocuments({ seller: sellerId });
    const activeAuctions = await Auction.countDocuments({ seller: sellerId, status: 'active' });
    const endedAuctions = await Auction.countDocuments({ seller: sellerId, status: 'ended' });

    res.json({
      productCount,
      auctionCount,
      activeAuctions,
      endedAuctions,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

// Create a new auction (seller only)
const createAuction = async (req, res) => {
  try {
    const { title, description, startingBid, endDate } = req.body;

    const auction = new Auction({
      title,
      description,
      startingBid,
      endDate,
      seller: req.user._id,
      status: 'active' // default to 'active'
    });

    await auction.save();
    res.status(201).json(auction);
  } catch (error) {
    console.error("Error creating auction:", error);
    res.status(500).json({ message: "Failed to create auction" });
  }
};

module.exports = {
  getDashboardStats,
  createAuction
};

