const express = require("express");
const router = express.Router();
const LabourContractsPage = require("../../models/emigrants/labour-contracts-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/emigrants/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await LabourContractsPage.findOne({});
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.any(), async (req, res) => {
  try {
    const pageData = {
      description: req.body.description || '',
      points: req.body.points ? JSON.parse(req.body.points) : []
    };

    const existingPage = await LabourContractsPage.findOne({});
    const page = existingPage
      ? await LabourContractsPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new LabourContractsPage(pageData).save();
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = {
      description: req.body.description || '',
      points: req.body.points ? JSON.parse(req.body.points) : []
    };

    const page = await LabourContractsPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
