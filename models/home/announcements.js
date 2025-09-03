const mongoose = require('mongoose');

// Announcement Schema
const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  deadline: {
    type: String
  },
  announcement_category: {
    type: String,
    required: true,
    trim: true
  },
  orange_button_title: {
    type: String,
    required: true,
    trim: true
  },
  orange_button_link: {
    type: String,
    required: true,
    trim: true
  },
  blue_button_title: {
    type: String,
    required: true,
    trim: true
  },
  blue_button_link: {
    type: String,
    required: true,
    trim: true
  },
  flag: { // <-- new field for uploaded image
    type: String,
  }
}, {
  timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;