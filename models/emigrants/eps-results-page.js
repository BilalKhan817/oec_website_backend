const mongoose = require("mongoose");

const epsResultsPageSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  points: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("EpsResultsPage", epsResultsPageSchema);
