const mongoose = require("mongoose");

const preDepartureTrainingPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Pre-Departure Training"
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
  training_programs: [{
    program_name: String,
    description: String,
    duration: String,
    modules: [String],
    target_countries: [String],
    is_mandatory: Boolean,
    order: Number,
  }],
  modules_covered: [{
    module_name: String,
    description: String,
    duration: String,
    key_topics: [String],
    order: Number,
  }],
  training_centers: [{
    center_name: String,
    location: String,
    address: String,
    contact: String,
    facilities: [String],
    order: Number,
  }],
  registration_process: [{
    step_number: Number,
    title: String,
    description: String,
    required_documents: [String],
  }],
  schedules: [{
    batch_name: String,
    start_date: Date,
    end_date: Date,
    seats_available: Number,
    registration_deadline: Date,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("PreDepartureTrainingPage", preDepartureTrainingPageSchema);
