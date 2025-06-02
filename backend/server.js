const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "https://zingy-dolphin-f24425.netlify.app", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.json());


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auctions", require("./routes/auctionRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));


app.get('/', (req, res) => {
	res.send('API is running...');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
