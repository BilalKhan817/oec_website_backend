// routes/compositionRoutes.js
const express = require("express");
const router = express.Router();
const BoardOfDirectors = require("../../models/about-us/board-of-directors");

// Get all members
router.get("/", async (req, res) => {
  try {
    const members = await BoardOfDirectors.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one member
router.get("/:id", async (req, res) => {
  try {
    const member = await BoardOfDirectors.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a member
router.post("/", async (req, res) => {
  const member = new BoardOfDirectors({
    name: req.body.name,
    designation: req.body.designation,
    representing: req.body.representing,
  });

  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a member
router.put("/:id", async (req, res) => {
  try {
    const updatedMember = await BoardOfDirectors.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        designation: req.body.designation,
        representing: req.body.representing,
      },
      { new: true }
    );
    if (!updatedMember) return res.status(404).json({ message: "Member not found" });
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a member
router.delete("/:id", async (req, res) => {
  try {
    const deletedMember = await BoardOfDirectors.findByIdAndDelete(req.params.id);
    if (!deletedMember) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
