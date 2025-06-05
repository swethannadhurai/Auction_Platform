const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const inventoryController = require('../controllers/inventoryController');
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware, sellerOnly } = require('../middleware/authMiddleware');

// Auction management
router.post('/auctions', authMiddleware, sellerOnly, auctionController.createAuctionItem);
router.get('/auctions', authMiddleware, sellerOnly, auctionController.getAuctionItemsByUser);
router.put('/auctions/:id', authMiddleware, sellerOnly, auctionController.updateAuctionItem);
router.delete('/auctions/:id', authMiddleware, sellerOnly, auctionController.deleteAuctionItem);

// Inventory management
router.get('/inventory', authMiddleware, sellerOnly, inventoryController.getInventory);
router.put('/inventory/:id', authMiddleware, sellerOnly, inventoryController.updateInventory);

// Dashboard
router.get('/dashboard', authMiddleware, sellerOnly, dashboardController.getDashboardStats);

module.exports = router;


