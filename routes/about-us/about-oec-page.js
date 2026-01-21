const express = require("express");
const router = express.Router();
const AboutOecPage = require("../../models/about-us/about-oec-page");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/about-us/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get About OEC page content
router.get("/", async (req, res) => {
  try {
    const page = await AboutOecPage.findOne({ is_active: true });
    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get page by ID (for admin)
router.get("/:id", async (req, res) => {
  try {
    const page = await AboutOecPage.findById(req.params.id);
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create or Update About OEC page
router.post("/", upload.fields([
  { name: 'hero_image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), async (req, res) => {
  try {
    const pageData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      introduction: req.body.introduction,
      mission: req.body.mission,
      vision: req.body.vision,
      history: req.body.history,
      objectives: req.body.objectives ? JSON.parse(req.body.objectives) : [],
      achievements: req.body.achievements ? JSON.parse(req.body.achievements) : [],
      statistics: req.body.statistics ? JSON.parse(req.body.statistics) : [],
      gallery: req.body.gallery ? JSON.parse(req.body.gallery) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    if (req.files?.hero_image) {
      pageData.hero_image = `/uploads/about-us/${req.files.hero_image[0].filename}`;
    }

    // Check if page exists
    const existingPage = await AboutOecPage.findOne({});

    let page;
    if (existingPage) {
      page = await AboutOecPage.findByIdAndUpdate(existingPage._id, pageData, { new: true });
    } else {
      page = new AboutOecPage(pageData);
      await page.save();
    }

    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update About OEC page
router.put("/:id", upload.fields([
  { name: 'hero_image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      introduction: req.body.introduction,
      mission: req.body.mission,
      vision: req.body.vision,
      history: req.body.history,
      objectives: req.body.objectives ? JSON.parse(req.body.objectives) : undefined,
      achievements: req.body.achievements ? JSON.parse(req.body.achievements) : undefined,
      statistics: req.body.statistics ? JSON.parse(req.body.statistics) : undefined,
      gallery: req.body.gallery ? JSON.parse(req.body.gallery) : undefined,
      is_active: req.body.is_active,
    };

    if (req.files?.hero_image) {
      updateData.hero_image = `/uploads/about-us/${req.files.hero_image[0].filename}`;
    }

    const page = await AboutOecPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });

    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete About OEC page
router.delete("/:id", async (req, res) => {
  try {
    const page = await AboutOecPage.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, message: "Page deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
