const mongoose = require("mongoose");

const mediaGallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    gallery_type: {
      type: String,
      enum: ["photo", "video", "mixed"],
      required: true,
    },
    description: {
      type: String,
    },
    event_date: {
      type: Date,
    },
    photos: [
      {
        image_url: String,
        caption: String,
        photographer: String,
      },
    ],
    videos: [
      {
        video_url: String,
        thumbnail: String,
        caption: String,
        duration: String,
      },
    ],
    cover_image: {
      type: String,
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

module.exports = mongoose.model("MediaGallery", mediaGallerySchema);
