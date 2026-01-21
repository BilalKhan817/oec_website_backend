const mongoose = require("mongoose");

const achievementsPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Our Achievements"
  },
  subtitle: {
    type: String,
    required: false,
  },
  navbar_description: {
    type: String,
    required: false,
    default: "Milestones and accomplishments"
  },
  key_achievements: [{
    type: String
  }],
  service_timelines: [{
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
  milestones: [{
    year: String,
    title: String,
    description: String,
    image: String,
    category: String,
    order: Number,
  }],
  awards: [{
    title: String,
    awarded_by: String,
    year: String,
    description: String,
    image: String,
    order: Number,
  }],
  statistics: [{
    label: String,
    value: String,
    icon: String,
    description: String,
    order: Number,
  }],
  timeline_enabled: {
    type: Boolean,
    default: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("AchievementsPage", achievementsPageSchema);
