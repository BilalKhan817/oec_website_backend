const mongoose = require("mongoose");

const missionVisionPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Mission & Vision"
  },
  subtitle: {
    type: String,
    required: false,
  },
  navbar_description: {
    type: String,
    required: false,
    default: "Our mission, vision and core values"
  },
  mission_title: {
    type: String,
    default: "Our Mission"
  },
  mission_statement: {
    type: String,
    required: true,
  },
  mission_image: {
    type: String,
    required: false,
  },
  vision_title: {
    type: String,
    default: "Our Vision"
  },
  vision_statement: {
    type: String,
    required: true,
  },
  vision_image: {
    type: String,
    required: false,
  },
  core_values: [{
    title: String,
    description: String,
    icon: String,
    order: Number,
  }],
  strategic_goals: [{
    title: String,
    description: String,
    target_year: String,
    order: Number,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("MissionVisionPage", missionVisionPageSchema);
