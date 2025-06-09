const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token and get user ID
function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

// We'll store cart items in the user document for simplicity:

// Get user cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.cart || []);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add item to cart
router.post("/", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity required" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cart) user.cart = [];

    // Check if product already in cart
    const existingIndex = user.cart.findIndex((item) => item.product.toString() === productId);

    if (existingIndex >= 0) {
      user.cart[existingIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove item from cart
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
