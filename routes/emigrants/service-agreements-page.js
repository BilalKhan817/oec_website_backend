const express = require("express");
const router = express.Router();
const ServiceAgreementsPage = require("../../models/emigrants/service-agreements-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/emigrants/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await ServiceAgreementsPage.findOne({});
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.any(), async (req, res) => {
  try {
    const pageData = {
      service_boxes: req.body.service_boxes ? JSON.parse(req.body.service_boxes) : []
    };

    const existingPage = await ServiceAgreementsPage.findOne({});
    const page = existingPage
      ? await ServiceAgreementsPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new ServiceAgreementsPage(pageData).save();
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = {
      service_boxes: req.body.service_boxes ? JSON.parse(req.body.service_boxes) : []
    };

    const page = await ServiceAgreementsPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
