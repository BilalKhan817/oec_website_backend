const express = require("express");
const router = express.Router();
const SuccessStory = require("../../models/development-hub/success-story");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/development-hub/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const { isActive, isFeatured } = req.query;
    let query = {};
    if (isActive !== undefined) query.is_active = isActive === 'true';
    if (isFeatured !== undefined) query.is_featured = isFeatured === 'true';

    const stories = await SuccessStory.find(query).sort({ order: 1, date_published: -1 });
    res.json({ success: true, data: stories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: "Story not found" });
    res.json({ success: true, data: story });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.fields([{ name: 'worker_photo', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
  try {
    const storyData = {
      ...req.body,
      achievement_highlights: req.body.achievement_highlights ? JSON.parse(req.body.achievement_highlights) : [],
      images: req.body.images ? JSON.parse(req.body.images) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    if (req.files?.worker_photo) storyData.worker_photo = `/uploads/development-hub/${req.files.worker_photo[0].filename}`;
    if (req.files?.images) {
      storyData.images = req.files.images.map(f => `/uploads/development-hub/${f.filename}`);
    }

    const story = new SuccessStory(storyData);
    await story.save();
    res.status(201).json({ success: true, data: story });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.achievement_highlights) updateData.achievement_highlights = JSON.parse(req.body.achievement_highlights);

    const story = await SuccessStory.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!story) return res.status(404).json({ success: false, message: "Story not found" });
    res.json({ success: true, data: story });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const story = await SuccessStory.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: "Story not found" });
    res.json({ success: true, message: "Story deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
