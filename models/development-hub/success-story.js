const mongoose = require("mongoose");

const successStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  worker_name: {
    type: String,
    required: true,
  },
  worker_photo: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: false,
  },
  story: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: false,
  },
  achievement_highlights: [String],
  before_journey: {
    type: String,
    required: false,
  },
  after_journey: {
    type: String,
    required: false,
  },
  images: [String],
  video_url: {
    type: String,
    required: false,
  },
  date_published: {
    type: Date,
    default: Date.now,
  },
  is_featured: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("SuccessStory", successStorySchema);
