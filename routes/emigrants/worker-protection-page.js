const express = require("express");
const router = express.Router();
const WorkerProtectionPage = require("../../models/emigrants/worker-protection-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/emigrants/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await WorkerProtectionPage.findOne({ is_active: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.any(), async (req, res) => {
  try {
    const pageData = { ...req.body };
    Object.keys(pageData).forEach(key => {
      if (typeof pageData[key] === 'string' && (pageData[key].startsWith('[') || pageData[key].startsWith('{'))) {
        try { pageData[key] = JSON.parse(pageData[key]); } catch(e) {}
      }
    });
    const existingPage = await WorkerProtectionPage.findOne({});
    const page = existingPage
      ? await WorkerProtectionPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new WorkerProtectionPage(pageData).save();
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    Object.keys(updateData).forEach(key => {
      if (typeof updateData[key] === 'string' && (updateData[key].startsWith('[') || updateData[key].startsWith('{'))) {
        try { updateData[key] = JSON.parse(updateData[key]); } catch(e) {}
      }
    });
    const page = await WorkerProtectionPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
