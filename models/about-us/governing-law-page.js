const mongoose = require("mongoose");

const governingLawPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Governing Law"
  },
  subtitle: {
    type: String,
    required: false,
  },
  navbar_description: {
    type: String,
    required: false,
    default: "Legal framework and regulations governing overseas employment."
  },
  legal_points: [{
    type: String
  }],
  introduction: {
    type: String,
    required: false,
  },
  laws: [{
    title: String,
    description: String,
    enacted_date: Date,
    pdf_url: String,
    order: Number,
  }],
  regulations: [{
    title: String,
    description: String,
    enacted_date: Date,
    pdf_url: String,
    order: Number,
  }],
  ordinances: [{
    title: String,
    description: String,
    enacted_date: Date,
    pdf_url: String,
    order: Number,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("GoverningLawPage", governingLawPageSchema);
