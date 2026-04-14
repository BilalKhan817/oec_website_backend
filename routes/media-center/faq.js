const express = require("express");
const router = express.Router();
const FaqCategory = require("../../models/media-center/faq");
const FaqSettings = require("../../models/media-center/faq-settings");

// GET all FAQ categories with their FAQs
router.get("/", async (req, res) => {
  try {
    const categories = await FaqCategory.find().sort({ order: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a new FAQ category
router.post("/categories", async (req, res) => {
  try {
    const { name, icon, order } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }
    const category = new FaqCategory({ name: name.trim(), icon: icon || '', order: order || 0, faqs: [] });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error("Error creating FAQ category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update a FAQ category name
router.put("/categories/:id", async (req, res) => {
  try {
    const { name, icon, order } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (icon !== undefined) updateData.icon = icon.trim();
    if (order !== undefined) updateData.order = order;

    const category = await FaqCategory.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    console.error("Error updating FAQ category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE a FAQ category
router.delete("/categories/:id", async (req, res) => {
  try {
    const category = await FaqCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST add a FAQ to a category
router.post("/categories/:id/faqs", async (req, res) => {
  try {
    const { question, answer, order } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, message: "Question is required" });
    }
    if (!answer || !answer.trim()) {
      return res.status(400).json({ success: false, message: "Answer is required" });
    }

    const category = await FaqCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    category.faqs.push({ question: question.trim(), answer: answer.trim(), order: order || 0 });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error("Error adding FAQ:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update a FAQ within a category
router.put("/categories/:categoryId/faqs/:faqId", async (req, res) => {
  try {
    const { question, answer, order } = req.body;
    const category = await FaqCategory.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const faq = category.faqs.id(req.params.faqId);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    if (question !== undefined) faq.question = question.trim();
    if (answer !== undefined) faq.answer = answer.trim();
    if (order !== undefined) faq.order = order;

    await category.save();
    res.json({ success: true, data: category });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE a FAQ from a category
router.delete("/categories/:categoryId/faqs/:faqId", async (req, res) => {
  try {
    const category = await FaqCategory.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const faq = category.faqs.id(req.params.faqId);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    faq.deleteOne();
    await category.save();
    res.json({ success: true, data: category });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET FAQ settings (Need More Help section)
router.get("/settings", async (req, res) => {
  try {
    let settings = await FaqSettings.findOne();
    if (!settings) {
      settings = await FaqSettings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error("Error fetching FAQ settings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update FAQ settings
router.put("/settings", async (req, res) => {
  try {
    const { phone, email } = req.body;
    const updateData = {};
    if (phone !== undefined) updateData.phone = phone.trim();
    if (email !== undefined) updateData.email = email.trim();

    let settings = await FaqSettings.findOne();
    if (!settings) {
      settings = await FaqSettings.create(updateData);
    } else {
      settings = await FaqSettings.findByIdAndUpdate(
        settings._id,
        { $set: updateData },
        { new: true }
      );
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error("Error updating FAQ settings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
