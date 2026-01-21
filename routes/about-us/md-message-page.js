const express = require("express");
const router = express.Router();
const MdMessagePage = require("../../models/about-us/md-message-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/about-us/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await MdMessagePage.findOne({ is_active: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.fields([{ name: 'md_photo', maxCount: 1 }, { name: 'signature_image', maxCount: 1 }]), async (req, res) => {
  try {
    const pageData = {
      title: req.body.title,
      navbar_description: req.body.navbar_description,
      md_name: req.body.md_name,
      md_designation: req.body.md_designation,
      message: req.body.message,
      quote: req.body.quote,
      achievements: req.body.achievements ? JSON.parse(req.body.achievements) : [],
      vision_statement: req.body.vision_statement,
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    if (req.files?.md_photo) pageData.md_photo = `/uploads/about-us/${req.files.md_photo[0].filename}`;
    if (req.files?.signature_image) pageData.signature_image = `/uploads/about-us/${req.files.signature_image[0].filename}`;

    const existingPage = await MdMessagePage.findOne({});
    let page = existingPage
      ? await MdMessagePage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new MdMessagePage(pageData).save();

    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.navbar_description) updateData.navbar_description = req.body.navbar_description;
    if (req.body.achievements) updateData.achievements = JSON.parse(req.body.achievements);

    const page = await MdMessagePage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
