const express = require("express");
const router = express.Router();
const OurFunctionsPage = require("../../models/about-us/our-functions-page");
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

// Get Our Functions page content
router.get("/", async (req, res) => {
  try {
    const page = await OurFunctionsPage.findOne({ is_active: true });
    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create or Update page
router.post("/", upload.any(), async (req, res) => {
  try {
    const pageData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      function_points: req.body.function_points ? JSON.parse(req.body.function_points) : [],
      introduction: req.body.introduction,
      core_functions: req.body.core_functions ? JSON.parse(req.body.core_functions) : [],
      responsibilities: req.body.responsibilities ? JSON.parse(req.body.responsibilities) : [],
      services_provided: req.body.services_provided ? JSON.parse(req.body.services_provided) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    const existingPage = await OurFunctionsPage.findOne({});

    let page;
    if (existingPage) {
      page = await OurFunctionsPage.findByIdAndUpdate(existingPage._id, pageData, { new: true });
    } else {
      page = new OurFunctionsPage(pageData);
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
      function_points: req.body.function_points ? JSON.parse(req.body.function_points) : undefined,
      introduction: req.body.introduction,
      core_functions: req.body.core_functions ? JSON.parse(req.body.core_functions) : undefined,
      responsibilities: req.body.responsibilities ? JSON.parse(req.body.responsibilities) : undefined,
      services_provided: req.body.services_provided ? JSON.parse(req.body.services_provided) : undefined,
      is_active: req.body.is_active,
    };

    const page = await OurFunctionsPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });

    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
