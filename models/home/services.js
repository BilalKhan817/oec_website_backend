const mongoose = require('mongoose');

// Services Schema
const servicesSchema = new mongoose.Schema({
  section_title: {
    type: String,
    required: true,
    trim: true,
    default: "Our Services"
  },
  section_subtitle: {
    type: String,
    required: true,
    trim: true,
    default: "Comprehensive employment solutions for job seekers and employers"
  },
  services: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;