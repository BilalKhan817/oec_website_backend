const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed'],
    default: 'planned',
  },
  start_date: {
    type: Date,
    required: false,
  },
  end_date: {
    type: Date,
    required: false,
  },
  budget: {
    type: String,
    required: false,
  },
  funding_source: {
    type: String,
    required: false,
  },
  objectives: [String],
  key_activities: [String],
  beneficiaries: {
    type: String,
    required: false,
  },
  expected_outcomes: [String],
  project_manager: {
    type: String,
    required: false,
  },
  partners: [{
    name: String,
    logo: String,
  }],
  images: [String],
  documents: [{
    title: String,
    file_url: String,
  }],
  progress_percentage: {
    type: Number,
    default: 0,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
