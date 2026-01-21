const mongoose = require("mongoose");

const whyChooseOecPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Why Choose OEC"
  },
  subtitle: {
    type: String,
    required: false,
  },
  navbar_description: {
    type: String,
    required: false,
    default: "Reasons to choose OEC for overseas employment"
  },
  why_choose_text: {
    type: String,
    required: false,
  },
  key_advantages: [{
    type: String
  }],
  introduction: {
    type: String,
    required: false,
  },
  hero_image: {
    type: String,
    required: false,
  },
  reasons: [{
    title: String,
    description: String,
    icon: String,
    image: String,
    order: Number,
  }],
  benefits: [{
    title: String,
    description: String,
    icon: String,
    order: Number,
  }],
  testimonials: [{
    name: String,
    designation: String,
    company: String,
    message: String,
    photo: String,
    rating: Number,
    order: Number,
  }],
  success_metrics: [{
    label: String,
    value: String,
    icon: String,
    order: Number,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("WhyChooseOecPage", whyChooseOecPageSchema);
