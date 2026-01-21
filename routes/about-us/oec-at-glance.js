const express = require("express");
const router = express.Router();
const OecAtGlance = require("../../models/about-us/oec-at-glance");

// GET - Get the OEC at Glance content (single document)
router.get("/", async (req, res) => {
  try {
    const content = await OecAtGlance.findOne({ is_active: true });

    if (!content) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "No content found. Please create one."
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Error fetching OEC at Glance content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch OEC at Glance content",
      error: error.message
    });
  }
});

// GET - Get OEC at Glance content by ID
router.get("/:id", async (req, res) => {
  try {
    const content = await OecAtGlance.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "OEC at Glance content not found"
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Error fetching OEC at Glance content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch OEC at Glance content",
      error: error.message
    });
  }
});

// POST - Create new OEC at Glance content
router.post("/", async (req, res) => {
  try {
    // Deactivate all existing content
    await OecAtGlance.updateMany({}, { is_active: false });

    // Create new content
    const newContent = new OecAtGlance({
      ...req.body,
      is_active: true
    });

    const savedContent = await newContent.save();

    res.status(201).json({
      success: true,
      message: "OEC at Glance content created successfully",
      data: savedContent
    });
  } catch (error) {
    console.error("Error creating OEC at Glance content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create OEC at Glance content",
      error: error.message
    });
  }
});

// PUT - Update OEC at Glance content
router.put("/:id", async (req, res) => {
  try {
    const updatedContent = await OecAtGlance.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: "OEC at Glance content not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "OEC at Glance content updated successfully",
      data: updatedContent
    });
  } catch (error) {
    console.error("Error updating OEC at Glance content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update OEC at Glance content",
      error: error.message
    });
  }
});

// DELETE - Delete OEC at Glance content
router.delete("/:id", async (req, res) => {
  try {
    const deletedContent = await OecAtGlance.findByIdAndDelete(req.params.id);

    if (!deletedContent) {
      return res.status(404).json({
        success: false,
        message: "OEC at Glance content not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "OEC at Glance content deleted successfully",
      data: deletedContent
    });
  } catch (error) {
    console.error("Error deleting OEC at Glance content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete OEC at Glance content",
      error: error.message
    });
  }
});

module.exports = router;
