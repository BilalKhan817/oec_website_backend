const express = require("express");
const router = express.Router();
const DevelopmentHub = require("../../models/us-submenu/development-hub");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/development-hub/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get all development hub items
router.get("/", async (req, res) => {
  try {
    const items = await DevelopmentHub.find({}).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one development hub item
router.get("/:id", async (req, res) => {
  try {
    const item = await DevelopmentHub.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a development hub item
router.post("/", async (req, res) => {
  const item = new DevelopmentHub({
    title: req.body.title,
    description: req.body.description,
    order: req.body.order || 0
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a development hub item
router.put("/:id", async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      order: req.body.order
    };

    const updatedItem = await DevelopmentHub.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a development hub item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await DevelopmentHub.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
