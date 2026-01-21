const mongoose = require("mongoose");

const mdMessagePageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Managing Director's Message"
  },
  navbar_description: {
    type: String,
    required: false,
    default: "Message from the Managing Director"
  },
  md_name: {
    type: String,
    required: true,
  },
  md_designation: {
    type: String,
    default: "Managing Director"
  },
  md_photo: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: false,
  },
  achievements: [{
    title: String,
    description: String,
    year: String,
  }],
  vision_statement: {
    type: String,
    required: false,
  },
  signature_image: {
    type: String,
    required: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("MdMessagePage", mdMessagePageSchema);
