const mongoose = require("mongoose");

const mediaCenterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['news', 'video', 'photo', 'press-release', 'article'],
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  mediaUrl: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: false,
  },
  tags: [{
    type: String,
  }],
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("MediaCenter", mediaCenterSchema);
