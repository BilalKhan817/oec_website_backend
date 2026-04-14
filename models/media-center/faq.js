const mongoose = require("mongoose");

const faqItemSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  order: { type: Number, default: 0 },
});

const faqCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    faqs: [faqItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FaqCategory", faqCategorySchema);
