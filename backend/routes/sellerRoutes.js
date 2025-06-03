
const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const { authMiddleware, sellerOnly } = require('../middleware/authMiddleware');

router.post('/register', sellerController.registerSeller);
router.post('/login', sellerController.loginSeller);
router.get('/logout', sellerController.logoutSeller);

router.post('/products', authMiddleware, sellerOnly, sellerController.createProduct);
router.get('/products', authMiddleware, sellerOnly, sellerController.getProducts);
router.put('/products/:id', authMiddleware, sellerOnly, sellerController.updateProduct);
router.delete('/products/:id', authMiddleware, sellerOnly, sellerController.deleteProduct);

module.exports = router;

