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
  banner_title_highlight: {
    text: {
      type: String,
      required: false,
      trim: true
    },
    color: {
      type: String,
      required: false,
      trim: true,
      default: '#FFD700' // Default yellow/gold color
    }
  },
 banner_subtitle: {
  type: mongoose.Schema.Types.Mixed, // Can be string, array, or null
  required: false // Change this from true to false
},
  banner_subtitle_type: {
  type: String,
  enum: ['text', 'points', 'none'],
  required: true,
  default: 'none'
},
  support_message: {
    type: String,
    required: false,
    trim: true,
    default: "Making your overseas journey easier and comfortable with comprehensive support services."
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