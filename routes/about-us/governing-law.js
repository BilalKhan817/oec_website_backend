const express = require("express");
const router = express.Router();
const GoverningLaw = require("../../models/about-us/governing-law");

// GET - Get the Governing Law content (single document)
router.get("/", async (req, res) => {
  try {
    const content = await GoverningLaw.findOne({ is_active: true });

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
    console.error("Error fetching Governing Law content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Governing Law content",
      error: error.message
    });
  }
});

// GET - Get Governing Law content by ID
router.get("/:id", async (req, res) => {
  try {
    const content = await GoverningLaw.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Governing Law content not found"
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Error fetching Governing Law content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Governing Law content",
      error: error.message
    });
  }
});

// POST - Create new Governing Law content
router.post("/", async (req, res) => {
  try {
    // Deactivate all existing content
    await GoverningLaw.updateMany({}, { is_active: false });

    // Create new content
    const newContent = new GoverningLaw({
      ...req.body,
      is_active: true
    });

    const savedContent = await newContent.save();

    res.status(201).json({
      success: true,
      message: "Governing Law content created successfully",
      data: savedContent
    });
  } catch (error) {
    console.error("Error creating Governing Law content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Governing Law content",
      error: error.message
    });
  }
});

// PUT - Update Governing Law content
router.put("/:id", async (req, res) => {
  try {
    const updatedContent = await GoverningLaw.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: "Governing Law content not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Governing Law content updated successfully",
      data: updatedContent
    });
  } catch (error) {
    console.error("Error updating Governing Law content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Governing Law content",
      error: error.message
    });
  }
});

// DELETE - Delete Governing Law content
router.delete("/:id", async (req, res) => {
  try {
    const deletedContent = await GoverningLaw.findByIdAndDelete(req.params.id);

    if (!deletedContent) {
      return res.status(404).json({
        success: false,
        message: "Governing Law content not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Governing Law content deleted successfully",
      data: deletedContent
    });
  } catch (error) {
    console.error("Error deleting Governing Law content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Governing Law content",
      error: error.message
    });
  }
});

module.exports = router;
