// server/routes/sellerAuctionRoutes.js
const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const inventoryController = require('../controllers/inventoryController');
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware, sellerOnly } = require('../middleware/authMiddleware');

router.post('/auctions', authMiddleware, sellerOnly, auctionController.createAuction);
router.get('/auctions', authMiddleware, sellerOnly, auctionController.getSellerAuctions);
router.put('/auctions/:id', authMiddleware, sellerOnly, auctionController.updateAuction);
router.delete('/auctions/:id', authMiddleware, sellerOnly, auctionController.deleteAuction);

router.get('/inventory', authMiddleware, sellerOnly, inventoryController.getInventory);
router.put('/inventory/:id', authMiddleware, sellerOnly, inventoryController.updateInventory);

router.get('/dashboard', authMiddleware, sellerOnly, dashboardController.getDashboardStats);

module.exports = router;
