const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

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

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "username");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("createdBy", "username");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new product (auth required)
router.post("/", authMiddleware, async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ message: "Please enter all required fields" });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      createdBy: req.user.id,
      reviews: [],
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
