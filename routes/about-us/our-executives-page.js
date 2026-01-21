const express = require("express");
const router = express.Router();
const OurExecutivesPage = require("../../models/about-us/our-executives-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/about-us/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get page
router.get("/", async (req, res) => {
  try {
    const page = await OurExecutivesPage.findOne({ is_active: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create or Update
router.post("/", upload.any(), async (req, res) => {
  try {
    const pageData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      introduction: req.body.introduction,
      executives: req.body.executives ? JSON.parse(req.body.executives) : [],
      leadership_items: req.body.leadership_items ? JSON.parse(req.body.leadership_items) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    if (req.files?.hero_image) {
      pageData.hero_image = `/uploads/about-us/${req.files.hero_image[0].filename}`;
    }

    // Handle leadership item images
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file, index) => {
        if (file.fieldname.startsWith('leadership_image_')) {
          const imageIndex = parseInt(file.fieldname.split('_')[2]);
          if (pageData.leadership_items[imageIndex]) {
            pageData.leadership_items[imageIndex].image = `/uploads/about-us/${file.filename}`;
          }
        }
      });
    }

    const existingPage = await OurExecutivesPage.findOne({});
    let page;
    if (existingPage) {
      page = await OurExecutivesPage.findByIdAndUpdate(existingPage._id, pageData, { new: true });
    } else {
      page = new OurExecutivesPage(pageData);
      await page.save();
    }
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      navbar_description: req.body.navbar_description,
      introduction: req.body.introduction,
      executives: req.body.executives ? JSON.parse(req.body.executives) : undefined,
      leadership_items: req.body.leadership_items ? JSON.parse(req.body.leadership_items) : undefined,
      is_active: req.body.is_active,
    };

    // Handle leadership item images
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file, index) => {
        if (file.fieldname.startsWith('leadership_image_')) {
          const imageIndex = parseInt(file.fieldname.split('_')[2]);
          if (updateData.leadership_items && updateData.leadership_items[imageIndex]) {
            updateData.leadership_items[imageIndex].image = `/uploads/about-us/${file.filename}`;
          }
        }
      });
    }

    const page = await OurExecutivesPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
