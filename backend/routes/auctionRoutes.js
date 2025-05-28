const express = require("express");
const {
	createAuctionItem,
	getAuctionItems,
	updateAuctionItem,
	deleteAuctionItem,
	getAuctionItemById,
	getAuctionItemsByUser,
	getAuctionWinner,
	getAuctionsWonByUser,
} = require("../controllers/auctionController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multerConfig");

const router = express.Router();

// Get all auctions, or create a new auction with image upload
router
	.route("/")
	.get(getAuctionItems)
	.post(authMiddleware, upload.single("image"), createAuctionItem);

// Get auctions created by the logged-in user
router.post("/user", authMiddleware, getAuctionItemsByUser);

// Get winner of a specific auction
router.get("/winner/:auctionId", authMiddleware, getAuctionWinner);


// Get all auctions won by the logged-in user
router.post("/won", authMiddleware, getAuctionsWonByUser);

// Get, update, or delete an auction by ID
router
	.route("/:id")
	.get(authMiddleware, getAuctionItemById)
	.put(authMiddleware, updateAuctionItem)
	.delete(authMiddleware, deleteAuctionItem);

module.exports = router;
