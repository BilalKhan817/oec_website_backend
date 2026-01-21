const mongoose = require("mongoose");

const epsKoreaPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    default: "Employment Permit System"
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model("EpsKoreaPage", epsKoreaPageSchema);
