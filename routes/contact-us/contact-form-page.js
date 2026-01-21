const express = require("express");
const router = express.Router();
const ContactFormPage = require("../../models/contact-us/contact-form-page");

const parseJSON = (data) => {
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch (e) {
    return data;
  }
};

// GET contact form page
router.get("/", async (req, res) => {
  try {
    const page = await ContactFormPage.findOne({ is_active: true });
    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create or update contact form page
router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.form_settings) data.form_settings = parseJSON(data.form_settings);
    if (data.inquiry_categories)
      data.inquiry_categories = parseJSON(data.inquiry_categories);
    if (data.contact_info) data.contact_info = parseJSON(data.contact_info);
    if (data.social_media) data.social_media = parseJSON(data.social_media);
    if (data.faqs) data.faqs = parseJSON(data.faqs);

    let page = await ContactFormPage.findOne();
    if (page) {
      page = await ContactFormPage.findByIdAndUpdate(page._id, data, {
        new: true,
        runValidators: true,
      });
    } else {
      page = new ContactFormPage(data);
      await page.save();
    }

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update contact form page by ID
router.put("/:id", async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.form_settings) data.form_settings = parseJSON(data.form_settings);
    if (data.inquiry_categories)
      data.inquiry_categories = parseJSON(data.inquiry_categories);
    if (data.contact_info) data.contact_info = parseJSON(data.contact_info);
    if (data.social_media) data.social_media = parseJSON(data.social_media);
    if (data.faqs) data.faqs = parseJSON(data.faqs);

    const page = await ContactFormPage.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
