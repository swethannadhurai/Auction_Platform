// services/emailService.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email send error:", error);
  }
};

const sendOutbidEmail = async (to, auctionTitle) => {
  const subject = "You've been outbid!";
  const html = `<p>You have been outbid on the auction: <b>${auctionTitle}</b>. Place a higher bid to win!</p>`;
  await sendEmail(to, subject, html);
};


const sendAuctionResultEmail = async (to, auctionTitle, isWinner) => {
  const subject = isWinner
    ? "Congratulations! You won the auction"
    : "Auction ended";

  const html = isWinner
    ? `<p>Congratulations! You won the auction for <b>${auctionTitle}</b>.</p>`
    : `<p>The auction for <b>${auctionTitle}</b> has ended.</p>`;

  await sendEmail(to, subject, html);
};


const sendBidConfirmationEmail = async (to, auctionTitle, bidAmount) => {
  const subject = "Bid Confirmation";
  const html = `<p>Your bid of <b>$${bidAmount}</b> for auction <b>${auctionTitle}</b> has been placed successfully.</p>`;
  await sendEmail(to, subject, html);
};

module.exports = {
  sendOutbidEmail,
  sendAuctionResultEmail,
  sendBidConfirmationEmail,
};
