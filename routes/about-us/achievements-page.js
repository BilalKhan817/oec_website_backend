const express = require("express");
const router = express.Router();
const AchievementsPage = require("../../models/about-us/achievements-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/about-us/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await AchievementsPage.findOne({ is_active: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.any(), async (req, res) => {
  try {
    const pageData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      key_achievements: req.body.key_achievements ? JSON.parse(req.body.key_achievements) : [],
      service_timelines: req.body.service_timelines ? JSON.parse(req.body.service_timelines) : [],
      introduction: req.body.introduction,
      hero_image: req.body.hero_image,
      milestones: req.body.milestones ? JSON.parse(req.body.milestones) : [],
      awards: req.body.awards ? JSON.parse(req.body.awards) : [],
      statistics: req.body.statistics ? JSON.parse(req.body.statistics) : [],
      timeline_enabled: req.body.timeline_enabled !== undefined ? req.body.timeline_enabled : true,
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    const existingPage = await AchievementsPage.findOne({});
    let page = existingPage
      ? await AchievementsPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new AchievementsPage(pageData).save();

    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.navbar_description) updateData.navbar_description = req.body.navbar_description;
    if (req.body.key_achievements) updateData.key_achievements = JSON.parse(req.body.key_achievements);
    if (req.body.service_timelines) updateData.service_timelines = JSON.parse(req.body.service_timelines);
    if (req.body.milestones) updateData.milestones = JSON.parse(req.body.milestones);
    if (req.body.awards) updateData.awards = JSON.parse(req.body.awards);
    if (req.body.statistics) updateData.statistics = JSON.parse(req.body.statistics);

    const page = await AchievementsPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
