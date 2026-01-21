const mongoose = require("mongoose");

const pressReleaseSchema = new mongoose.Schema(
  {
    points: [{
      title: String,
      date: String
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

module.exports = mongoose.model("PressRelease", pressReleaseSchema);
