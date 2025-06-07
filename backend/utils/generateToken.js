const jwt = require("jsonwebtoken");

const generateToken = (res, user) => {
  const token = jwt.sign(
    { _id: user._id, role: user.role }, 
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;



