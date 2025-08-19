const mongoose = require('mongoose');

// Banner Schema
const bannerSchema = new mongoose.Schema({
  background_image: {
    type: String,
    required: true,
    trim: true
  },
  banner_title: {
    type: String,
    required: true,
    trim: true
  },
  banner_title_color: {
    type: String,
    required: true,
    trim: true,
    default: '#FFFFFF' // Default white color
  },
  banner_subtitle: {
    type: mongoose.Schema.Types.Mixed, // Can be string or array
    required: true
  },
  banner_subtitle_type: {
    type: String,
    enum: ['text', 'points'],
    required: true,
    default: 'text'
  },
  green_button: {
    type: String,
    required: true,
    trim: true
  },
  green_button_link: {
    type: String,
    required: true,
    trim: true
  },
  gray_button: {
    type: String,
    required: true,
    trim: true
  },
  gray_button_link: {
    type: String,
    required: true,
    trim: true
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Banner Model
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;