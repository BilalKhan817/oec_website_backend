const express = require("express");
const router = express.Router();
const EpsResultsPage = require("../../models/emigrants/eps-results-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/emigrants/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await EpsResultsPage.findOne({});
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

    const existingPage = await EpsResultsPage.findOne({});
    const page = existingPage
      ? await EpsResultsPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new EpsResultsPage(pageData).save();
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

    const page = await EpsResultsPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
