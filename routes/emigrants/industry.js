const express = require("express");
const router = express.Router();
const Industry = require("../../models/emigrants/industry");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/emigrants/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get all industries
router.get("/", async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = isActive !== undefined ? { is_active: isActive === 'true' } : {};
    const industries = await Industry.find(query).sort({ order: 1, industry_name: 1 });
    res.json({ success: true, data: industries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single industry
router.get("/:id", async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry) return res.status(404).json({ success: false, message: "Industry not found" });
    res.json({ success: true, data: industry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create industry
router.post("/", upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const industryData = {
      ...req.body,
      job_types: req.body.job_types ? JSON.parse(req.body.job_types) : [],
      countries: req.body.countries ? JSON.parse(req.body.countries) : [],
      average_salary: req.body.average_salary ? JSON.parse(req.body.average_salary) : undefined,
      required_skills: req.body.required_skills ? JSON.parse(req.body.required_skills) : [],
      certifications_needed: req.body.certifications_needed ? JSON.parse(req.body.certifications_needed) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    if (req.files?.icon) industryData.icon = `/uploads/emigrants/${req.files.icon[0].filename}`;
    if (req.files?.image) industryData.image = `/uploads/emigrants/${req.files.image[0].filename}`;

    const industry = new Industry(industryData);
    await industry.save();
    res.status(201).json({ success: true, data: industry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update industry
router.put("/:id", upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.job_types) updateData.job_types = JSON.parse(req.body.job_types);
    if (req.body.countries) updateData.countries = JSON.parse(req.body.countries);
    if (req.body.average_salary) updateData.average_salary = JSON.parse(req.body.average_salary);
    if (req.body.required_skills) updateData.required_skills = JSON.parse(req.body.required_skills);
    if (req.body.certifications_needed) updateData.certifications_needed = JSON.parse(req.body.certifications_needed);

    if (req.files?.icon) updateData.icon = `/uploads/emigrants/${req.files.icon[0].filename}`;
    if (req.files?.image) updateData.image = `/uploads/emigrants/${req.files.image[0].filename}`;

    const industry = await Industry.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!industry) return res.status(404).json({ success: false, message: "Industry not found" });
    res.json({ success: true, data: industry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete industry
router.delete("/:id", async (req, res) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);
    if (!industry) return res.status(404).json({ success: false, message: "Industry not found" });
    res.json({ success: true, message: "Industry deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
