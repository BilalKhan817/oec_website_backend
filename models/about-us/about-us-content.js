const mongoose = require("mongoose");

const aboutUsContentSchema = new mongoose.Schema(
  {
    // Page Header
    page_title: {
      type: String,
      required: true,
      default: "ABOUT US"
    },
    organization_name: {
      type: String,
      required: true,
      default: "Overseas Employment Corporation (OEC)"
    },
    established_year: {
      type: String,
      default: "1976"
    },
    ministry_name: {
      type: String,
      default: "Ministry of Overseas Pakistanis & Human Resource Development"
    },

    // Introduction Section
    introduction_title: {
      type: String,
      default: "Introduction"
    },
    introduction_content: {
      type: String,
      required: true
    },

    // Legal Mandate Section
    legal_mandate_title: {
      type: String,
      default: "Our Legal Mandate"
    },
    legal_mandate_items: [{
      text: String
    }],

    // Our Role Section
    our_role_title: {
      type: String,
      default: "Our Role"
    },
    our_role_items: [{
      text: String
    }],

    // Target Sectors Section
    target_sectors_title: {
      type: String,
      default: "Our Target Sectors"
    },
    target_sectors_items: [{
      icon: String,
      text: String
    }],

    // Unique Strength Section
    unique_strength_title: {
      type: String,
      default: "Our Unique Strength"
    },
    unique_strength_items: [{
      text: String
    }],

    // Vision Section
    vision_title: {
      type: String,
      default: "Our Vision"
    },
    vision_content: {
      type: String,
      required: true
    },

    // Mission Section
    mission_title: {
      type: String,
      default: "Our Mission"
    },
    mission_content: {
      type: String,
      required: true
    },

    // Core Values Section
    core_values_title: {
      type: String,
      default: "Our Core Values"
    },
    core_values_items: [{
      text: String
    }],

    // Impact Section
    impact_title: {
      type: String,
      default: "Our Impact"
    },
    impact_items: [{
      text: String
    }],

    // Future Goals Section
    future_goals_title: {
      type: String,
      default: "Our Future Goals"
    },
    future_goals_items: [{
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

module.exports = mongoose.model("AboutUsContent", aboutUsContentSchema);
