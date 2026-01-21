const express = require("express");
const router = express.Router();
const MissionVisionPage = require("../../models/about-us/mission-vision-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/about-us/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await MissionVisionPage.findOne({ is_active: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.fields([{ name: 'mission_image', maxCount: 1 }, { name: 'vision_image', maxCount: 1 }]), async (req, res) => {
  try {
    const pageData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      mission_title: req.body.mission_title,
      mission_statement: req.body.mission_statement,
      vision_title: req.body.vision_title,
      vision_statement: req.body.vision_statement,
      core_values: req.body.core_values ? JSON.parse(req.body.core_values) : [],
      strategic_goals: req.body.strategic_goals ? JSON.parse(req.body.strategic_goals) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    if (req.files?.mission_image) pageData.mission_image = `/uploads/about-us/${req.files.mission_image[0].filename}`;
    if (req.files?.vision_image) pageData.vision_image = `/uploads/about-us/${req.files.vision_image[0].filename}`;

    const existingPage = await MissionVisionPage.findOne({});
    let page = existingPage
      ? await MissionVisionPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new MissionVisionPage(pageData).save();

    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.navbar_description) updateData.navbar_description = req.body.navbar_description;
    if (req.body.mission_title) updateData.mission_title = req.body.mission_title;
    if (req.body.mission_statement) updateData.mission_statement = req.body.mission_statement;
    if (req.body.vision_title) updateData.vision_title = req.body.vision_title;
    if (req.body.vision_statement) updateData.vision_statement = req.body.vision_statement;
    if (req.body.core_values) updateData.core_values = JSON.parse(req.body.core_values);
    if (req.body.strategic_goals) updateData.strategic_goals = JSON.parse(req.body.strategic_goals);

    const page = await MissionVisionPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
