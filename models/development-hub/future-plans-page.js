const mongoose = require("mongoose");

const futurePlansPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Future Plans"
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
  strategic_vision: {
    title: String,
    description: String,
    target_year: String,
  },
  upcoming_initiatives: [{
    title: String,
    description: String,
    expected_launch: String,
    category: String,
    icon: String,
    order: Number,
  }],
  development_goals: [{
    goal: String,
    description: String,
    target_date: Date,
    status: String,
    order: Number,
  }],
  digital_transformation: {
    title: String,
    description: String,
    key_areas: [String],
  },
  expansion_plans: [{
    region: String,
    description: String,
    timeline: String,
    order: Number,
  }],
  innovation_roadmap: [{
    innovation: String,
    description: String,
    timeline: String,
    order: Number,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("FuturePlansPage", futurePlansPageSchema);
