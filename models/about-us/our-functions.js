const mongoose = require("mongoose");

const ourFunctionsSchema = new mongoose.Schema(
  {
    // Page Header
    page_title: {
      type: String,
      required: true,
      default: "Core Roles & Responsibilities of the Overseas Employment Corporation (OEC)"
    },

    // Strategic Role Section
    strategic_role_title: {
      type: String,
      default: "Strategic Role"
    },
    strategic_role_content: {
      type: String,
      default: "As Pakistan's only government-owned overseas recruitment agency, OEC operates with the mandate to manage, regulate, and facilitate the legal export of Pakistani manpower to foreign countries."
    },

    // Key Functions Section
    key_functions_title: {
      type: String,
      default: "Key Functions by Category"
    },
    key_functions_items: [{
      title: String,
      items: [{
        text: String,
        nested_items: [{
          text: String
        }]
      }]
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

module.exports = mongoose.model("OurFunctions", ourFunctionsSchema);
