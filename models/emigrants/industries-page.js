const mongoose = require("mongoose");

const industriesPageSchema = new mongoose.Schema({
  industries_we_serve: [{
    type: String
  }],
  fee_structure: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("IndustriesPage", industriesPageSchema);
