const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const { authMiddleware, sellerOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

// ----------- Seller Auth Routes -----------


router.post('/register', sellerController.registerSeller);

router.post('/login', sellerController.loginSeller);

router.post('/logout', authMiddleware, sellerController.logoutSeller);

router.get('/profile', authMiddleware, sellerOnly, sellerController.getSellerProfile);

// ----------- Seller Product Routes -----------


router.post('/products', authMiddleware, sellerOnly, upload.single('image'), sellerController.createProduct);

router.get('/products', authMiddleware, sellerOnly, sellerController.getProducts);


router.put('/products/:id', authMiddleware, sellerOnly, sellerController.updateProduct);


router.delete('/products/:id', authMiddleware, sellerOnly, sellerController.deleteProduct);

module.exports = router;

