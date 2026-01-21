const mongoose = require("mongoose");

const reportsAnalyticsPageSchema = new mongoose.Schema(
  {
    page_title: {
      type: String,
      default: "Reports & Analytics",
    },
    page_subtitle: {
      type: String,
    },
    introduction: {
      type: String,
    },
    annual_reports: [
      {
        year: Number,
        title: String,
        description: String,
        file_url: String,
        file_size: String,
        cover_image: String,
        published_date: Date,
        is_active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    statistical_reports: [
      {
        title: String,
        description: String,
        period: String,
        file_url: String,
        file_size: String,
        published_date: Date,
        is_active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    performance_analytics: [
      {
        title: String,
        description: String,
        metrics: [
          {
            label: String,
            value: String,
            unit: String,
          },
        ],
        chart_data: mongoose.Schema.Types.Mixed,
        period: String,
        is_active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    research_publications: [
      {
        title: String,
        authors: [String],
        abstract: String,
        file_url: String,
        published_date: Date,
        category: String,
        is_active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    data_visualizations: [
      {
        title: String,
        description: String,
        visualization_type: {
          type: String,
          enum: ["chart", "graph", "infographic", "dashboard"],
        },
        image_url: String,
        interactive_url: String,
        is_active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    key_statistics: [
      {
        title: String,
        value: String,
        description: String,
        icon: String,
        order: Number,
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ReportsAnalyticsPage",
  reportsAnalyticsPageSchema
);
