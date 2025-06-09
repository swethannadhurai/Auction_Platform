//sellerAuctionRoutes

const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const inventoryController = require('../controllers/inventoryController');
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware, sellerOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

// Auction management
router.post('/auctions', authMiddleware, sellerOnly, upload.single('image'), auctionController.createAuctionItem);
router.get('/auctions', authMiddleware, sellerOnly, auctionController.getAuctionItemsByUser);
router.put('/auctions/:id', authMiddleware, sellerOnly, upload.single('image'), auctionController.updateAuctionItem);
router.delete('/auctions/:id', authMiddleware, sellerOnly, auctionController.deleteAuctionItem);

// Inventory management
router.post('/inventory', authMiddleware, sellerOnly, upload.single('image'), inventoryController.createProduct);
router.get('/inventory', authMiddleware, sellerOnly, inventoryController.getInventory);
router.put('/inventory/:id', authMiddleware, sellerOnly, upload.single('image'), inventoryController.updateInventory);
router.get('/inventory/:id', authMiddleware, sellerOnly, inventoryController.getProductById);
router.delete('/inventory/:id', authMiddleware, sellerOnly, inventoryController.deleteProduct);

// Dashboard
router.get('/dashboard', authMiddleware, sellerOnly, dashboardController.getDashboardStats);

module.exports = router;



