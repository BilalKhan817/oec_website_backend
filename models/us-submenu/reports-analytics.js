const mongoose = require("mongoose");

const reportsAnalyticsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reportType: {
    type: String,
    enum: ['annual-report', 'quarterly-report', 'research', 'statistics', 'analysis'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  year: {
    type: Number,
    required: false,
  },
  quarter: {
    type: String,
    enum: ['Q1', 'Q2', 'Q3', 'Q4'],
    required: false,
  },
  tags: [{
    type: String,
  }],
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("ReportsAnalytics", reportsAnalyticsSchema);
