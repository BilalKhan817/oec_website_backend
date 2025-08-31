// models/partnership.js
const mongoose = require("mongoose");

const partnershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Partnership", partnershipSchema);
