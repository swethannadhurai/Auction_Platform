// server/controllers/dashboardController.js
const Product = require('../models/Product');
const Auction = require('../models/Auction');

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
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

module.exports = { getDashboardStats };
