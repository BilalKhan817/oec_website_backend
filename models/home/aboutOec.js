const mongoose = require('mongoose');

// About OEC Schema
const aboutOecSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: "About OEC"
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
    default: "Building Careers, Connecting Nations Since 1976"
  },
  description_paragraph_1: {
    type: String,
    required: true,
    trim: true
  },
  description_paragraph_2: {
    type: String,
    required: true,
    trim: true
  },
  established_year: {
    type: String,
    required: true,
    default: "1976"
  },
  workers_sent: {
    type: String,
    required: true,
    default: "11M+"
  },
  youtube_video_link: {
  type: String,
  required: true,
  trim: true
},
  video_title: {
    type: String,
    required: true,
    trim: true,
    default: "A brief introduction about Overseas Employment Corporation"
  },
  button_text: {
    type: String,
    required: true,
    trim: true,
    default: "Learn More About OEC"
  },
  button_link: {
    type: String,
    required: true,
    trim: true,
    default: "/about"
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const AboutOec = mongoose.model('AboutOec', aboutOecSchema);

module.exports = AboutOec;