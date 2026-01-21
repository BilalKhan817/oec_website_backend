const mongoose = require("mongoose");

const mediaResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    resource_type: {
      type: String,
      enum: ["brochure", "guideline", "manual", "report", "infographic", "video", "audio", "other"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["emigration", "welfare", "training", "policy", "general"],
      default: "general",
    },
    file_url: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    file_size: {
      type: String,
    },
    file_format: {
      type: String,
    },
    video_url: {
      type: String,
    },
    published_date: {
      type: Date,
      default: Date.now,
    },
    download_count: {
      type: Number,
      default: 0,
    },
    is_downloadable: {
      type: Boolean,
      default: true,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MediaResource", mediaResourceSchema);
