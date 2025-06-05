const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const { authMiddleware, sellerOnly } = require('../middleware/authMiddleware');

// ✅ Add this new route for seller profile
router.get('/profile', authMiddleware, sellerController.getSellerProfile);

// Seller product management
router.post('/products', authMiddleware, sellerOnly, sellerController.createProduct);
router.get('/products', authMiddleware, sellerOnly, sellerController.getProducts);
router.put('/products/:id', authMiddleware, sellerOnly, sellerController.updateProduct);
router.delete('/products/:id', authMiddleware, sellerOnly, sellerController.deleteProduct);

module.exports = router;
