const express = require("express");
const router = express.Router();
const WhyChooseOecPage = require("../../models/about-us/why-choose-oec-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/about-us/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await WhyChooseOecPage.findOne({ is_active: true });
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
      why_choose_text: req.body.why_choose_text,
      key_advantages: req.body.key_advantages ? JSON.parse(req.body.key_advantages) : [],
      introduction: req.body.introduction,
      hero_image: req.body.hero_image,
      reasons: req.body.reasons ? JSON.parse(req.body.reasons) : [],
      benefits: req.body.benefits ? JSON.parse(req.body.benefits) : [],
      testimonials: req.body.testimonials ? JSON.parse(req.body.testimonials) : [],
      success_metrics: req.body.success_metrics ? JSON.parse(req.body.success_metrics) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    const existingPage = await WhyChooseOecPage.findOne({});
    let page = existingPage
      ? await WhyChooseOecPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new WhyChooseOecPage(pageData).save();

    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.navbar_description) updateData.navbar_description = req.body.navbar_description;
    if (req.body.why_choose_text) updateData.why_choose_text = req.body.why_choose_text;
    if (req.body.key_advantages) updateData.key_advantages = JSON.parse(req.body.key_advantages);
    if (req.body.reasons) updateData.reasons = JSON.parse(req.body.reasons);
    if (req.body.benefits) updateData.benefits = JSON.parse(req.body.benefits);
    if (req.body.testimonials) updateData.testimonials = JSON.parse(req.body.testimonials);
    if (req.body.success_metrics) updateData.success_metrics = JSON.parse(req.body.success_metrics);

    const page = await WhyChooseOecPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
