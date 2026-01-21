const mongoose = require("mongoose");

const contactFormPageSchema = new mongoose.Schema(
  {
    page_title: {
      type: String,
      default: "Contact Us",
    },
    page_subtitle: {
      type: String,
    },
    introduction: {
      type: String,
    },
    form_settings: {
      enable_name: {
        type: Boolean,
        default: true,
      },
      enable_email: {
        type: Boolean,
        default: true,
      },
      enable_phone: {
        type: Boolean,
        default: true,
      },
      enable_subject: {
        type: Boolean,
        default: true,
      },
      enable_message: {
        type: Boolean,
        default: true,
      },
      enable_file_upload: {
        type: Boolean,
        default: false,
      },
      enable_category: {
        type: Boolean,
        default: true,
      },
    },
    inquiry_categories: [
      {
        category_name: String,
        department: String,
        assigned_email: String,
      },
    ],
    contact_info: {
      general_email: String,
      support_email: String,
      helpline_number: String,
      whatsapp_number: String,
    },
    social_media: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
      youtube: String,
    },
    success_message: {
      type: String,
      default: "Thank you for contacting us. We will get back to you soon.",
    },
    faqs: [
      {
        question: String,
        answer: String,
        order: Number,
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ContactFormPage", contactFormPageSchema);
