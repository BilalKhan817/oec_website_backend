const express = require("express");
const router = express.Router();
const FuturePlansPage = require("../../models/development-hub/future-plans-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/development-hub/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await FuturePlansPage.findOne({ is_active: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.single('hero_image'), async (req, res) => {
  try {
    const pageData = {
      ...req.body,
      strategic_vision: req.body.strategic_vision ? JSON.parse(req.body.strategic_vision) : undefined,
      upcoming_initiatives: req.body.upcoming_initiatives ? JSON.parse(req.body.upcoming_initiatives) : [],
      development_goals: req.body.development_goals ? JSON.parse(req.body.development_goals) : [],
      digital_transformation: req.body.digital_transformation ? JSON.parse(req.body.digital_transformation) : undefined,
      expansion_plans: req.body.expansion_plans ? JSON.parse(req.body.expansion_plans) : [],
      innovation_roadmap: req.body.innovation_roadmap ? JSON.parse(req.body.innovation_roadmap) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    if (req.file) pageData.hero_image = `/uploads/development-hub/${req.file.filename}`;

    const existingPage = await FuturePlansPage.findOne({});
    const page = existingPage
      ? await FuturePlansPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new FuturePlansPage(pageData).save();

    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.strategic_vision) updateData.strategic_vision = JSON.parse(req.body.strategic_vision);
    if (req.body.upcoming_initiatives) updateData.upcoming_initiatives = JSON.parse(req.body.upcoming_initiatives);
    if (req.body.development_goals) updateData.development_goals = JSON.parse(req.body.development_goals);
    if (req.body.digital_transformation) updateData.digital_transformation = JSON.parse(req.body.digital_transformation);
    if (req.body.expansion_plans) updateData.expansion_plans = JSON.parse(req.body.expansion_plans);
    if (req.body.innovation_roadmap) updateData.innovation_roadmap = JSON.parse(req.body.innovation_roadmap);

    const page = await FuturePlansPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
