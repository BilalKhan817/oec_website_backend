const mongoose = require("mongoose");

const aboutOecPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "About OEC"
  },
  subtitle: {
    type: String,
    required: false,
  },
  navbar_description: {
    type: String,
    required: false,
    default: "Leading organization for overseas employment."
  },
  hero_image: {
    type: String,
    required: false,
  },
  introduction: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: false,
  },
  vision: {
    type: String,
    required: false,
  },
  history: {
    type: String,
    required: false,
  },
  objectives: [{
    title: String,
    description: String,
    icon: String,
  }],
  achievements: [{
    year: String,
    title: String,
    description: String,
  }],
  statistics: [{
    label: String,
    value: String,
    icon: String,
  }],
  gallery: [{
    image_url: String,
    caption: String,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("AboutOecPage", aboutOecPageSchema);
