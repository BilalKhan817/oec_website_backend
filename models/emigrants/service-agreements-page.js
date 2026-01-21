const mongoose = require("mongoose");

const serviceAgreementsPageSchema = new mongoose.Schema({
  service_boxes: [{
    title: String,
    description: String,
    order: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model("ServiceAgreementsPage", serviceAgreementsPageSchema);
