const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  file_title: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  attachment_type: {
    type: String,
    required: true,
    enum: ['attachment_file', 'link'], // Updated to match frontend
    trim: true
  },
  // For file attachments
  file_path: {
    type: String,
    required: function() { return this.attachment_type === 'attachment_file'; }
  },
  file_url: {
    type: String,
    required: function() { return this.attachment_type === 'attachment_file'; }
  },
  original_name: {
    type: String,
    required: function() { return this.attachment_type === 'attachment_file'; }
  },
  file_size: {
    type: Number,
    required: function() { return this.attachment_type === 'attachment_file'; }
  },
  mime_type: {
    type: String,
    required: function() { return this.attachment_type === 'attachment_file'; }
  },
  // For link attachments
  link_url: {
    type: String,
    required: function() { return this.attachment_type === 'link'; },
    trim: true
  }
}, {
  _id: true
});

// Updated Announcement Schema
const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  flag: {
    type: String, // Picture in announcement title
  },
  deadline: {
    type: String
  },
  announcement_category: {
    type: String,
    required: true,
    trim: true
  },
  attachments: [attachmentSchema], // Array of attachments
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
    trim: true
  },
  blue_button_link: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;