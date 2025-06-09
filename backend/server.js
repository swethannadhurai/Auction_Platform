const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { authMiddleware } = require("./middleware/authMiddleware");
const User = require("./models/User");
const Seller = require("./models/Seller");


dotenv.config();
connectDB();

const app = express();


app.use(
  cors({
    origin: "https://zingy-dolphin-f24425.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(cookieParser());
app.use(express.json());


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auctions", require("./routes/auctionRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));


app.use('/api/seller', require('./routes/sellerRoutes'));
app.use('/api/seller', require('./routes/sellerAuctionRoutes')); 



app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    if (!user) {
      user = await Seller.findById(req.user.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
