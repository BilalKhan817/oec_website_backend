const express = require("express");
const router = express.Router();
const OecAtGlancePage = require("../../models/about-us/oec-at-glance-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/about-us/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get OEC at Glance page content
router.get("/", async (req, res) => {
  try {
    const page = await OecAtGlancePage.findOne({ is_active: true });
    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create or Update page
router.post("/", upload.single('chart_image'), async (req, res) => {
  try {
    const pageData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      established_year: req.body.established_year,
      workers_sent: req.body.workers_sent,
      introduction: req.body.introduction,
      key_facts: req.body.key_facts ? JSON.parse(req.body.key_facts) : [],
      organizational_structure: req.body.organizational_structure ? JSON.parse(req.body.organizational_structure) : {},
      departments: req.body.departments ? JSON.parse(req.body.departments) : [],
      services_overview: req.body.services_overview ? JSON.parse(req.body.services_overview) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    if (req.file) {
      pageData.organizational_structure.chart_image = `/uploads/about-us/${req.file.filename}`;
    }

    const existingPage = await OecAtGlancePage.findOne({});

    let page;
    if (existingPage) {
      page = await OecAtGlancePage.findByIdAndUpdate(existingPage._id, pageData, { new: true });
    } else {
      page = new OecAtGlancePage(pageData);
      await page.save();
    }

    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update page
router.put("/:id", upload.single('chart_image'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      established_year: req.body.established_year,
      workers_sent: req.body.workers_sent,
      introduction: req.body.introduction,
      key_facts: req.body.key_facts ? JSON.parse(req.body.key_facts) : undefined,
      organizational_structure: req.body.organizational_structure ? JSON.parse(req.body.organizational_structure) : undefined,
      departments: req.body.departments ? JSON.parse(req.body.departments) : undefined,
      services_overview: req.body.services_overview ? JSON.parse(req.body.services_overview) : undefined,
      is_active: req.body.is_active,
    };

    if (req.file) {
      updateData.organizational_structure.chart_image = `/uploads/about-us/${req.file.filename}`;
    }

    const page = await OecAtGlancePage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });

    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
