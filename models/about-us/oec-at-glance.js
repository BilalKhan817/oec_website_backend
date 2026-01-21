const mongoose = require("mongoose");

const oecAtGlanceSchema = new mongoose.Schema(
  {
    // Page Header
    page_title: {
      type: String,
      required: true,
      default: "OEC at Glance"
    },
    page_subtitle: {
      type: String,
      default: "A visual and statistical snapshot of OEC's national impact and international reach."
    },

    // Year of Establishment Section
    establishment_icon: {
      type: String,
      default: "📅"
    },
    establishment_label: {
      type: String,
      default: "Year of Establishment"
    },
    establishment_year: {
      type: String,
      default: "1976"
    },
    establishment_note: {
      type: String,
      default: "Under the Ministry of Overseas Pakistanis & Human Resource Development"
    },

    // Legal Foundation Section
    legal_icon: {
      type: String,
      default: "📜"
    },
    legal_label: {
      type: String,
      default: "Legal Foundation"
    },
    legal_items: [{
      text: String
    }],

    // Headquarters Section
    headquarters_icon: {
      type: String,
      default: "🏢"
    },
    headquarters_label: {
      type: String,
      default: "Headquarters"
    },
    headquarters_items: [{
      text: String
    }],

    // Workforce Deployed Section
    workforce_icon: {
      type: String,
      default: "👷"
    },
    workforce_label: {
      type: String,
      default: "Workforce Deployed"
    },
    workforce_value: {
      type: String,
      default: "150,000+ Pakistani workers successfully deployed to:"
    },
    workforce_countries: [{
      country: String,
      flag: String
    }],

    // Registered Job Seekers Section
    job_seekers_icon: {
      type: String,
      default: "🗂️"
    },
    job_seekers_label: {
      type: String,
      default: "Registered Job Seekers"
    },
    job_seekers_value: {
      type: String,
      default: "400,000+ active applicants across Pakistan"
    },
    job_seekers_note: {
      type: String,
      default: "Regularly verified and matched to live demands"
    },

    // International Employers Section
    employers_icon: {
      type: String,
      default: "🌍"
    },
    employers_label: {
      type: String,
      default: "International Employers Served"
    },
    employers_value: {
      type: String,
      default: "4,500+ reputable employers & organizations"
    },

    // Key Programs Section
    programs_icon: {
      type: String,
      default: "🤝"
    },
    programs_label: {
      type: String,
      default: "Key Programs & Agreements"
    },
    programs_items: [{
      text: String
    }],

    // Language Training Section
    training_icon: {
      type: String,
      default: "🗣️"
    },
    training_label: {
      type: String,
      default: "Language Training & Development"
    },
    training_items: [{
      text: String
    }],

    // Technological Milestones Section
    tech_icon: {
      type: String,
      default: "💻"
    },
    tech_label: {
      type: String,
      default: "Technological Milestones"
    },
    tech_items: [{
      text: String
    }],

    // Core Functions Section
    functions_icon: {
      type: String,
      default: "🛠️"
    },
    functions_label: {
      type: String,
      default: "Core Functions in One Glance"
    },
    functions_steps: [{
      icon: String,
      label: String,
      description: String
    }],

    // Organizational Structure Section
    org_structure_icon: {
      type: String,
      default: "🏛️"
    },
    org_structure_label: {
      type: String,
      default: "Organizational Structure"
    },
    org_structure_items: [{
      text: String
    }],

    // Status
    is_active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("OecAtGlance", oecAtGlanceSchema);
