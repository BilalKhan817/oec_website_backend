const express = require("express");
const router = express.Router();
const Project = require("../../models/development-hub/project");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/development-hub/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const { isActive, status, category } = req.query;
    let query = {};
    if (isActive !== undefined) query.is_active = isActive === 'true';
    if (status) query.status = status;
    if (category) query.category = category;

    const projects = await Project.find(query).sort({ order: 1, start_date: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.any(), async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      objectives: req.body.objectives ? JSON.parse(req.body.objectives) : [],
      key_activities: req.body.key_activities ? JSON.parse(req.body.key_activities) : [],
      expected_outcomes: req.body.expected_outcomes ? JSON.parse(req.body.expected_outcomes) : [],
      partners: req.body.partners ? JSON.parse(req.body.partners) : [],
      images: req.body.images ? JSON.parse(req.body.images) : [],
      documents: req.body.documents ? JSON.parse(req.body.documents) : [],
      is_active: req.body.is_active !== undefined ? req.body.is_active : true,
    };

    const project = new Project(projectData);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.objectives) updateData.objectives = JSON.parse(req.body.objectives);
    if (req.body.key_activities) updateData.key_activities = JSON.parse(req.body.key_activities);
    if (req.body.expected_outcomes) updateData.expected_outcomes = JSON.parse(req.body.expected_outcomes);
    if (req.body.partners) updateData.partners = JSON.parse(req.body.partners);

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
