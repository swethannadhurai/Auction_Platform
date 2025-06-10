//sellerAuctionRoutes

const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const inventoryController = require('../controllers/inventoryController');
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware, sellerOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

// Auction management
router.post('/', authMiddleware, sellerOnly, upload.single('image'), auctionController.createAuctionItem);
router.get('/', authMiddleware, sellerOnly, auctionController.getAuctionItemsByUser);
router.put('/:id', authMiddleware, sellerOnly, upload.single('image'), auctionController.updateAuctionItem);
router.delete('/:id', authMiddleware, sellerOnly, auctionController.deleteAuctionItem);

// Inventory management
router.post('/', authMiddleware, sellerOnly, upload.single('image'), inventoryController.createProduct);
router.get('/', authMiddleware, sellerOnly, inventoryController.getInventory);
router.put('/:id', authMiddleware, sellerOnly, upload.single('image'), inventoryController.updateInventory);
router.get('/:id', authMiddleware, sellerOnly, inventoryController.getProductById);
router.delete('/:id', authMiddleware, sellerOnly, inventoryController.deleteProduct);

// Dashboard
router.get('/dashboard', authMiddleware, sellerOnly, dashboardController.getDashboardStats);

module.exports = router;



