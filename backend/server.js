const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Static folder for uploaded files
app.use('/uploads', express.static('uploads'));

// CORS setup
app.use(
	cors({
		origin: "https://quiet-mandazi-6c1883.netlify.app",
		methods: ["GET", "PUT", "POST", "DELETE"],
		credentials: true,
	})
);

// API routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auctions", require("./routes/auctionRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));

// ✅ Root route to prevent "Cannot GET /"
app.get('/', (req, res) => {
	res.send('API is running...');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
