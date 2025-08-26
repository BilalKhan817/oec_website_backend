const mongoose = require('mongoose');

// Executive Schema
const executiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  badge: {
    type: String,
    required: true,
    trim: true
  },
  image_url: {
    type: String,
    required: true,
    trim: true
  },
  profile_url: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    required: true,
    default: 1
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Executive = mongoose.model('Executive', executiveSchema);

module.exports = Executive;