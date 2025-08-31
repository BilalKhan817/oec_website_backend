// routes/partnershipRoutes.js
const express = require("express");
const router = express.Router();
const Partnership = require("../../models/about-us/partnerships");

// Get all partnerships
router.get("/", async (req, res) => {
  try {
    const data = await Partnership.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one partnership
router.get("/:id", async (req, res) => {
  try {
    const item = await Partnership.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one or many partnerships
router.post("/", async (req, res) => {
  try {
    let saved;
    if (Array.isArray(req.body)) {
      saved = await Partnership.insertMany(req.body);
    } else {
      const newItem = new Partnership(req.body);
      saved = await newItem.save();
    }
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update partnership
router.put("/:id", async (req, res) => {
  try {
    const updated = await Partnership.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete partnership
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Partnership.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
