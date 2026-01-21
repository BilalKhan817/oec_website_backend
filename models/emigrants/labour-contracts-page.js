const mongoose = require("mongoose");

const labourContractsPageSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  points: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("LabourContractsPage", labourContractsPageSchema);
