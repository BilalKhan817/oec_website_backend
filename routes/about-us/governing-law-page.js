const express = require("express");
const router = express.Router();
const GoverningLawPage = require("../../models/about-us/governing-law-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/about-us/laws/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get Governing Law page content
router.get("/", async (req, res) => {
  try {
    const page = await GoverningLawPage.findOne({ is_active: true });
    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create or Update Governing Law page
router.post("/", upload.any(), async (req, res) => {
  try {
    const pageData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      legal_points: req.body.legal_points ? JSON.parse(req.body.legal_points) : [],
      introduction: req.body.introduction,
      laws: req.body.laws ? JSON.parse(req.body.laws) : [],
      regulations: req.body.regulations ? JSON.parse(req.body.regulations) : [],
      ordinances: req.body.ordinances ? JSON.parse(req.body.ordinances) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    const existingPage = await GoverningLawPage.findOne({});

    let page;
    if (existingPage) {
      page = await GoverningLawPage.findByIdAndUpdate(existingPage._id, pageData, { new: true });
    } else {
      page = new GoverningLawPage(pageData);
      await page.save();
    }

    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update page
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      legal_points: req.body.legal_points ? JSON.parse(req.body.legal_points) : undefined,
      introduction: req.body.introduction,
      laws: req.body.laws ? JSON.parse(req.body.laws) : undefined,
      regulations: req.body.regulations ? JSON.parse(req.body.regulations) : undefined,
      ordinances: req.body.ordinances ? JSON.parse(req.body.ordinances) : undefined,
      is_active: req.body.is_active,
    };

    const page = await GoverningLawPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });

    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
