const mongoose = require("mongoose");

const latestAnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    points: [{
      type: String
    }],
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("LatestAnnouncement", latestAnnouncementSchema);
