const express = require("express");
const router = express.Router();
const { JobPosting, CareerForm } = require("../../models/media-center/career");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = "uploads/careers/";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// ==================== JOB POSTINGS ====================

// GET all job postings
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await JobPosting.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching job postings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a job posting
router.post("/jobs", async (req, res) => {
  try {
    const { title, grade, location, deadline, applyLink, order } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    const job = new JobPosting({
      title: title.trim(),
      grade: grade ? grade.trim() : "",
      location: location ? location.trim() : "",
      deadline: deadline ? new Date(deadline) : null,
      applyLink: applyLink ? applyLink.trim() : "",
      order: order || 0,
    });
    await job.save();
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    console.error("Error creating job posting:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update a job posting
router.put("/jobs/:id", async (req, res) => {
  try {
    const { title, grade, location, deadline, applyLink, order } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (grade !== undefined) updateData.grade = grade.trim();
    if (location !== undefined) updateData.location = location.trim();
    if (deadline !== undefined) updateData.deadline = deadline ? new Date(deadline) : null;
    if (applyLink !== undefined) updateData.applyLink = applyLink.trim();
    if (order !== undefined) updateData.order = order;

    const job = await JobPosting.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ success: false, message: "Job posting not found" });
    }
    res.json({ success: true, data: job });
  } catch (error) {
    console.error("Error updating job posting:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE a job posting
router.delete("/jobs/:id", async (req, res) => {
  try {
    const job = await JobPosting.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job posting not found" });
    }
    res.json({ success: true, message: "Job posting deleted" });
  } catch (error) {
    console.error("Error deleting job posting:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== DOWNLOADABLE FORMS ====================

// GET all career forms
router.get("/forms", async (req, res) => {
  try {
    const forms = await CareerForm.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: forms });
  } catch (error) {
    console.error("Error fetching career forms:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a career form (with file upload)
router.post("/forms", upload.single("file"), async (req, res) => {
  try {
    if (!req.body.title || !req.body.title.trim()) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    const formData = {
      title: req.body.title.trim(),
      description: req.body.description ? req.body.description.trim() : "",
      file_url: req.file ? `/uploads/careers/${req.file.filename}` : "",
      order: req.body.order || 0,
    };
    const form = new CareerForm(formData);
    await form.save();
    res.status(201).json({ success: true, data: form });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error("Error creating career form:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update a career form (with optional file replacement)
router.put("/forms/:id", upload.single("file"), async (req, res) => {
  try {
    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title.trim();
    if (req.body.description !== undefined) updateData.description = req.body.description.trim();
    if (req.body.order !== undefined) updateData.order = req.body.order;
    if (req.file) {
      updateData.file_url = `/uploads/careers/${req.file.filename}`;
    }

    const existing = await CareerForm.findById(req.params.id);
    if (!existing) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    if (req.file && existing.file_url) {
      const oldPath = path.join(__dirname, "../../", existing.file_url);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const form = await CareerForm.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    res.json({ success: true, data: form });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error("Error updating career form:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE a career form
router.delete("/forms/:id", async (req, res) => {
  try {
    const form = await CareerForm.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }
    if (form.file_url) {
      const filePath = path.join(__dirname, "../../", form.file_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.json({ success: true, message: "Form deleted" });
  } catch (error) {
    console.error("Error deleting career form:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
