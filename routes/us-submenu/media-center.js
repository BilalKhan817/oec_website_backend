const express = require("express");
const router = express.Router();
const MediaCenter = require("../../models/us-submenu/media-center");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/media-center/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get all media center items
router.get("/", async (req, res) => {
  try {
    const { isActive, mediaType, tags } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    if (mediaType) {
      query.mediaType = mediaType;
    }
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const items = await MediaCenter.find(query).sort({ publishDate: -1, order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one media center item
router.get("/:id", async (req, res) => {
  try {
    const item = await MediaCenter.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a media center item
router.post("/", upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'media', maxCount: 1 }
]), async (req, res) => {
  const item = new MediaCenter({
    title: req.body.title,
    description: req.body.description,
    mediaType: req.body.mediaType,
    thumbnail: (req.files && req.files.thumbnail) ? `/uploads/media-center/${req.files.thumbnail[0].filename}` : undefined,
    mediaUrl: (req.files && req.files.media) ? `/uploads/media-center/${req.files.media[0].filename}` : req.body.mediaUrl,
    content: req.body.content,
    publishDate: req.body.publishDate || Date.now(),
    author: req.body.author,
    tags: req.body.tags ? JSON.parse(req.body.tags) : [],
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

// Update a media center item
router.put("/:id", upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'media', maxCount: 1 }
]), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      mediaType: req.body.mediaType,
      content: req.body.content,
      publishDate: req.body.publishDate,
      author: req.body.author,
      tags: req.body.tags ? JSON.parse(req.body.tags) : undefined,
      order: req.body.order,
      isActive: req.body.isActive,
    };

    if (req.files && req.files.thumbnail) {
      updateData.thumbnail = `/uploads/media-center/${req.files.thumbnail[0].filename}`;
    }
    if (req.files && req.files.media) {
      updateData.mediaUrl = `/uploads/media-center/${req.files.media[0].filename}`;
    } else if (req.body.mediaUrl) {
      updateData.mediaUrl = req.body.mediaUrl;
    }

    const updatedItem = await MediaCenter.findByIdAndUpdate(
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

// Delete a media center item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await MediaCenter.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
