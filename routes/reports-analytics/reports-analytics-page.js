const express = require("express");
const router = express.Router();
const ReportDocument = require("../../models/reports-analytics/reports-analytics-page");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reports-analytics/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// GET all report documents
router.get("/", async (req, res) => {
  try {
    const documents = await ReportDocument.find().sort({ section: 1, createdAt: 1 });
    res.json({ success: true, data: documents });
  } catch (error) {
    console.error("Error fetching report documents:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST upload a new report document
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.body.title || !req.body.title.trim()) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    if (!req.body.section || !req.body.section.trim()) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: "Section is required" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "PDF file is required" });
    }

    const docData = {
      section: req.body.section.trim(),
      title: req.body.title.trim(),
      pdf_url: `/uploads/reports-analytics/${req.file.filename}`,
    };

    const document = new ReportDocument(docData);
    await document.save();
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error("Error uploading report document:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update a report document by ID
router.put("/:id", upload.single("pdf"), async (req, res) => {
  try {
    const updateData = {};
    if (req.body.section !== undefined) updateData.section = req.body.section.trim();
    if (req.body.title !== undefined) updateData.title = req.body.title.trim();
    if (req.file) {
      updateData.pdf_url = `/uploads/reports-analytics/${req.file.filename}`;
    }

    const existing = await ReportDocument.findById(req.params.id);
    if (!existing) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, message: "Document not found" });
    }

    // Delete old PDF if a new one is uploaded
    if (req.file && existing.pdf_url) {
      const oldPath = path.join(__dirname, "../../", existing.pdf_url);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const document = await ReportDocument.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json({ success: true, data: document });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error("Error updating report document:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE a report document by ID
router.delete("/:id", async (req, res) => {
  try {
    const document = await ReportDocument.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({ success: false, message: "Document not found" });
    }

    // Delete associated file from disk
    if (document.pdf_url) {
      const filePath = path.join(__dirname, "../../", document.pdf_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting report document:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
