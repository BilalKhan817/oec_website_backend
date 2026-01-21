const express = require("express");
const router = express.Router();
const AboutUsContent = require("../../models/about-us/about-us-content");

// GET - Get the About Us content (single document)
router.get("/", async (req, res) => {
  try {
    // Get the active About Us content
    const content = await AboutUsContent.findOne({ is_active: true });

    if (!content) {
      // If no content exists, return a default structure
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
    console.error("Error fetching About Us content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch About Us content",
      error: error.message
    });
  }
});

// GET - Get About Us content by ID
router.get("/:id", async (req, res) => {
  try {
    const content = await AboutUsContent.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "About Us content not found"
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Error fetching About Us content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch About Us content",
      error: error.message
    });
  }
});

// POST - Create new About Us content
router.post("/", async (req, res) => {
  try {
    // Deactivate all existing content
    await AboutUsContent.updateMany({}, { is_active: false });

    // Create new content
    const newContent = new AboutUsContent({
      ...req.body,
      is_active: true
    });

    const savedContent = await newContent.save();

    res.status(201).json({
      success: true,
      message: "About Us content created successfully",
      data: savedContent
    });
  } catch (error) {
    console.error("Error creating About Us content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create About Us content",
      error: error.message
    });
  }
});

// PUT - Update About Us content
router.put("/:id", async (req, res) => {
  try {
    const updatedContent = await AboutUsContent.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: "About Us content not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "About Us content updated successfully",
      data: updatedContent
    });
  } catch (error) {
    console.error("Error updating About Us content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update About Us content",
      error: error.message
    });
  }
});

// DELETE - Delete About Us content
router.delete("/:id", async (req, res) => {
  try {
    const deletedContent = await AboutUsContent.findByIdAndDelete(req.params.id);

    if (!deletedContent) {
      return res.status(404).json({
        success: false,
        message: "About Us content not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "About Us content deleted successfully",
      data: deletedContent
    });
  } catch (error) {
    console.error("Error deleting About Us content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete About Us content",
      error: error.message
    });
  }
});

module.exports = router;
