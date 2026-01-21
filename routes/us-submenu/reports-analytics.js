const express = require("express");
const router = express.Router();
const ReportsAnalytics = require("../../models/us-submenu/reports-analytics");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reports-analytics/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get all reports and analytics items
router.get("/", async (req, res) => {
  try {
    const { isActive, reportType, year, quarter, tags } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    if (reportType) {
      query.reportType = reportType;
    }
    if (year) {
      query.year = parseInt(year);
    }
    if (quarter) {
      query.quarter = quarter;
    }
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const items = await ReportsAnalytics.find(query).sort({ publicationDate: -1, order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one reports and analytics item
router.get("/:id", async (req, res) => {
  try {
    const item = await ReportsAnalytics.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a reports and analytics item
router.post("/", upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), async (req, res) => {
  const item = new ReportsAnalytics({
    title: req.body.title,
    description: req.body.description,
    reportType: req.body.reportType,
    thumbnail: req.files?.thumbnail ? `/uploads/reports-analytics/${req.files.thumbnail[0].filename}` : undefined,
    fileUrl: req.files?.file ? `/uploads/reports-analytics/${req.files.file[0].filename}` : req.body.fileUrl,
    publicationDate: req.body.publicationDate || Date.now(),
    year: req.body.year ? parseInt(req.body.year) : undefined,
    quarter: req.body.quarter,
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

// Update a reports and analytics item
router.put("/:id", upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      reportType: req.body.reportType,
      publicationDate: req.body.publicationDate,
      year: req.body.year ? parseInt(req.body.year) : undefined,
      quarter: req.body.quarter,
      tags: req.body.tags ? JSON.parse(req.body.tags) : undefined,
      order: req.body.order,
      isActive: req.body.isActive,
    };

    if (req.files?.thumbnail) {
      updateData.thumbnail = `/uploads/reports-analytics/${req.files.thumbnail[0].filename}`;
    }
    if (req.files?.file) {
      updateData.fileUrl = `/uploads/reports-analytics/${req.files.file[0].filename}`;
    } else if (req.body.fileUrl) {
      updateData.fileUrl = req.body.fileUrl;
    }

    const updatedItem = await ReportsAnalytics.findByIdAndUpdate(
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

// Delete a reports and analytics item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await ReportsAnalytics.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
