const mongoose = require("mongoose");

const boardOfDirectorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  representing: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("BoardOfDirectors", boardOfDirectorsSchema);