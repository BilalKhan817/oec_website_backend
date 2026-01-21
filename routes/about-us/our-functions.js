const express = require("express");
const router = express.Router();
const OurFunctions = require("../../models/about-us/our-functions");

// GET - Get the Our Functions content (single document)
router.get("/", async (req, res) => {
  try {
    const content = await OurFunctions.findOne({ is_active: true });

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
    console.error("Error fetching Our Functions content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Our Functions content",
      error: error.message
    });
  }
});

// GET - Get Our Functions content by ID
router.get("/:id", async (req, res) => {
  try {
    const content = await OurFunctions.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Our Functions content not found"
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Error fetching Our Functions content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Our Functions content",
      error: error.message
    });
  }
});

// POST - Create new Our Functions content
router.post("/", async (req, res) => {
  try {
    // Deactivate all existing content
    await OurFunctions.updateMany({}, { is_active: false });

    // Create new content
    const newContent = new OurFunctions({
      ...req.body,
      is_active: true
    });

    const savedContent = await newContent.save();

    res.status(201).json({
      success: true,
      message: "Our Functions content created successfully",
      data: savedContent
    });
  } catch (error) {
    console.error("Error creating Our Functions content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Our Functions content",
      error: error.message
    });
  }
});

// PUT - Update Our Functions content
router.put("/:id", async (req, res) => {
  try {
    const updatedContent = await OurFunctions.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: "Our Functions content not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Our Functions content updated successfully",
      data: updatedContent
    });
  } catch (error) {
    console.error("Error updating Our Functions content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Our Functions content",
      error: error.message
    });
  }
});

// DELETE - Delete Our Functions content
router.delete("/:id", async (req, res) => {
  try {
    const deletedContent = await OurFunctions.findByIdAndDelete(req.params.id);

    if (!deletedContent) {
      return res.status(404).json({
        success: false,
        message: "Our Functions content not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Our Functions content deleted successfully",
      data: deletedContent
    });
  } catch (error) {
    console.error("Error deleting Our Functions content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Our Functions content",
      error: error.message
    });
  }
});

module.exports = router;
