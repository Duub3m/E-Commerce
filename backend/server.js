require("dotenv").config(); // Load environment variables
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Middleware for parsing form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // my email
    pass: process.env.PASSWORD, // my Gmail Password
  },
});

// Verify SMTP Configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Configuration Error:", error);
  } else {
    console.log("SMTP Configuration Successful. Ready to send emails.");
  }
});

// **1. Contact Page Email**
app.post("/contact-email", (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.RECEIVER_EMAIL || process.env.EMAIL, // Receiver's email
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email", details: error.message });
    } else {
      console.log("Contact email sent successfully:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

// **2. Purchase Confirmation Email**
app.post("/purchase-email", (req, res) => {
  const {
    name,
    email,
    subtotal = 0,
    shippingHandling = 0,
    estimatedTax = 0,
    orderTotal = 0,
    address,
  } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Purchase Confirmation - ShopEase",
    text: `Dear ${name},\n\nThank you for your purchase!\n\nOrder Summary:\nSubtotal: $${parseFloat(
      subtotal
    ).toFixed(2)}\nShipping & Handling: $${parseFloat(
      shippingHandling
    ).toFixed(2)}\nEstimated Tax: $${parseFloat(
      estimatedTax
    ).toFixed(2)}\nOrder Total: $${parseFloat(
      orderTotal
    ).toFixed(2)}\n\nShipping Address:\n${address}\n\nWe appreciate your business!\n\nBest regards,\nShopEase Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email", details: error.message });
    } else {
      console.log("Purchase confirmation email sent successfully:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});


// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
