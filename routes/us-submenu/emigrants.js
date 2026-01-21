const express = require("express");
const router = express.Router();
const Emigrants = require("../../models/us-submenu/emigrants");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/emigrants/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get all emigrants items
router.get("/", async (req, res) => {
  try {
    const { isActive, category } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    if (category) {
      query.category = category;
    }

    const items = await Emigrants.find(query).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one emigrants item
router.get("/:id", async (req, res) => {
  try {
    const item = await Emigrants.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an emigrants item
router.post("/", upload.single("image"), async (req, res) => {
  const item = new Emigrants({
    title: req.body.title,
    description: req.body.description,
    image: req.file ? `/uploads/emigrants/${req.file.filename}` : undefined,
    content: req.body.content,
    category: req.body.category,
    order: req.body.order || 0,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an emigrants item
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      category: req.body.category,
      order: req.body.order,
      isActive: req.body.isActive,
    };

    if (req.file) {
      updateData.image = `/uploads/emigrants/${req.file.filename}`;
    }

    const updatedItem = await Emigrants.findByIdAndUpdate(
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

// Delete an emigrants item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Emigrants.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
