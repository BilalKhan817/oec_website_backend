const mongoose = require("mongoose");

const industrySchema = new mongoose.Schema({
  industry_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  job_types: [{
    title: String,
    description: String,
  }],
  countries: [String],
  average_salary: {
    currency: String,
    min: Number,
    max: Number,
  },
  required_skills: [String],
  certifications_needed: [String],
  total_workers_sent: Number,
  growth_rate: String,
  is_active: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("Industry", industrySchema);
