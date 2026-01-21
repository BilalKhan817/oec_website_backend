const mongoose = require("mongoose");

const workerProtectionPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Worker Protection & Welfare"
  },
  subtitle: {
    type: String,
    required: false,
  },
  introduction: {
    type: String,
    required: true,
  },
  hero_image: {
    type: String,
    required: false,
  },
  protection_measures: [{
    title: String,
    description: String,
    details: String,
    icon: String,
    order: Number,
  }],
  welfare_services: [{
    service_name: String,
    description: String,
    eligibility: String,
    how_to_apply: String,
    contact: String,
    order: Number,
  }],
  legal_support: {
    description: String,
    helpline: String,
    email: String,
    office_hours: String,
  },
  grievance_mechanism: {
    description: String,
    complaint_form_url: String,
    process_steps: [String],
    expected_timeline: String,
  },
  success_stories: [{
    title: String,
    description: String,
    worker_name: String,
    case_type: String,
    order: Number,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("WorkerProtectionPage", workerProtectionPageSchema);
