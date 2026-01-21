const express = require("express");
const router = express.Router();
const IndustriesPage = require("../../models/emigrants/industries-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/emigrants/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await IndustriesPage.findOne({});
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.any(), async (req, res) => {
  try {
    const pageData = {
      industries_we_serve: req.body.industries_we_serve ? JSON.parse(req.body.industries_we_serve) : [],
      fee_structure: req.body.fee_structure ? JSON.parse(req.body.fee_structure) : []
    };

    const existingPage = await IndustriesPage.findOne({});
    const page = existingPage
      ? await IndustriesPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new IndustriesPage(pageData).save();

    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = {
      industries_we_serve: req.body.industries_we_serve ? JSON.parse(req.body.industries_we_serve) : [],
      fee_structure: req.body.fee_structure ? JSON.parse(req.body.fee_structure) : []
    };

    const page = await IndustriesPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
