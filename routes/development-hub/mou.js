const express = require("express");
const router = express.Router();
const Mou = require("../../models/development-hub/mou");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/development-hub/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const { isActive, mou_type } = req.query;
    let query = {};
    if (isActive !== undefined) query.is_active = isActive === 'true';
    if (mou_type) query.mou_type = mou_type;

    const mous = await Mou.find(query).sort({ order: 1, signed_date: -1 });
    res.json({ success: true, data: mous });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const mou = await Mou.findById(req.params.id);
    if (!mou) return res.status(404).json({ success: false, message: "MoU not found" });
    res.json({ success: true, data: mou });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.fields([{ name: 'partner_logo', maxCount: 1 }, { name: 'document_url', maxCount: 1 }, { name: 'signing_ceremony_images', maxCount: 10 }]), async (req, res) => {
  try {
    const mouData = {
      ...req.body,
      objectives: req.body.objectives ? JSON.parse(req.body.objectives) : [],
      key_areas: req.body.key_areas ? JSON.parse(req.body.key_areas) : [],
      benefits: req.body.benefits ? JSON.parse(req.body.benefits) : [],
      signing_ceremony_images: req.body.signing_ceremony_images ? JSON.parse(req.body.signing_ceremony_images) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    if (req.files?.partner_logo) mouData.partner_logo = `/uploads/development-hub/${req.files.partner_logo[0].filename}`;
    if (req.files?.document_url) mouData.document_url = `/uploads/development-hub/${req.files.document_url[0].filename}`;
    if (req.files?.signing_ceremony_images) {
      mouData.signing_ceremony_images = req.files.signing_ceremony_images.map(f => `/uploads/development-hub/${f.filename}`);
    }

    const mou = new Mou(mouData);
    await mou.save();
    res.status(201).json({ success: true, data: mou });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.objectives) updateData.objectives = JSON.parse(req.body.objectives);
    if (req.body.key_areas) updateData.key_areas = JSON.parse(req.body.key_areas);
    if (req.body.benefits) updateData.benefits = JSON.parse(req.body.benefits);

    const mou = await Mou.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!mou) return res.status(404).json({ success: false, message: "MoU not found" });
    res.json({ success: true, data: mou });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const mou = await Mou.findByIdAndDelete(req.params.id);
    if (!mou) return res.status(404).json({ success: false, message: "MoU not found" });
    res.json({ success: true, message: "MoU deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
