const express = require("express");
const router = express.Router();
const ContactUs = require("../models/contact-us");

// Get active contact us content
router.get("/", async (req, res) => {
  try {
    const content = await ContactUs.findOne({ is_active: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Error fetching contact us content:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contact us content",
      error: error.message
    });
  }
});

// Get contact us content by ID
router.get("/:id", async (req, res) => {
  try {
    const content = await ContactUs.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Contact us content not found"
      });
    }
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Error fetching contact us content:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contact us content",
      error: error.message
    });
  }
});

// Create new contact us content
router.post("/", async (req, res) => {
  try {
    // Deactivate all existing content
    await ContactUs.updateMany({}, { is_active: false });

    const newContent = new ContactUs(req.body);
    await newContent.save();

    res.status(201).json({
      success: true,
      message: "Contact us content created successfully",
      data: newContent
    });
  } catch (error) {
    console.error("Error creating contact us content:", error);
    res.status(500).json({
      success: false,
      message: "Error creating contact us content",
      error: error.message
    });
  }
});

// Update contact us content
router.put("/:id", async (req, res) => {
  try {
    const updatedContent = await ContactUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: "Contact us content not found"
      });
    }

    res.json({
      success: true,
      message: "Contact us content updated successfully",
      data: updatedContent
    });
  } catch (error) {
    console.error("Error updating contact us content:", error);
    res.status(500).json({
      success: false,
      message: "Error updating contact us content",
      error: error.message
    });
  }
});

// Delete contact us content
router.delete("/:id", async (req, res) => {
  try {
    const deletedContent = await ContactUs.findByIdAndDelete(req.params.id);

    if (!deletedContent) {
      return res.status(404).json({
        success: false,
        message: "Contact us content not found"
      });
    }

    res.json({
      success: true,
      message: "Contact us content deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting contact us content:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting contact us content",
      error: error.message
    });
  }
});

module.exports = router;
