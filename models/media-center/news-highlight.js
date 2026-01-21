const mongoose = require("mongoose");

const newsHighlightSchema = new mongoose.Schema(
  {
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

module.exports = mongoose.model("NewsHighlight", newsHighlightSchema);
