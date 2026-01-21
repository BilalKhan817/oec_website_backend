const mongoose = require("mongoose");

const oecAtGlancePageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "OEC at a Glance"
  },
  subtitle: {
    type: String,
    required: false,
  },
  navbar_description: {
    type: String,
    required: false,
    default: "Quick facts and statistics about OEC"
  },
  established_year: {
    type: String,
    required: false,
    default: "1976"
  },
  workers_sent: {
    type: String,
    required: false,
    default: "11M+"
  },
  introduction: {
    type: String,
    required: false,
  },
  key_facts: [{
    title: String,
    value: String,
    description: String,
    icon: String,
    order: Number,
  }],
  organizational_structure: {
    title: String,
    description: String,
    chart_image: String,
  },
  departments: [{
    name: String,
    description: String,
    head: String,
    contact: String,
    icon: String,
    order: Number,
  }],
  services_overview: [{
    title: String,
    description: String,
    icon: String,
    link: String,
    order: Number,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("OecAtGlancePage", oecAtGlancePageSchema);
