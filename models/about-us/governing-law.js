const mongoose = require("mongoose");

const governingLawSchema = new mongoose.Schema(
  {
    // Page Header
    page_title: {
      type: String,
      required: true,
      default: "Legal Framework of the Overseas Employment Corporation (OEC)"
    },

    // Statutory Status Section
    statutory_status_title: {
      type: String,
      default: "Statutory Status"
    },
    statutory_status_intro: {
      type: String,
      default: "The Overseas Employment Corporation (OEC) is a public sector company wholly owned by the Government of Pakistan. It operates under:"
    },
    statutory_status_items: [{
      text: String
    }],

    // Regulatory Oversight Section
    regulatory_oversight_title: {
      type: String,
      default: "Regulatory Oversight"
    },
    regulatory_oversight_intro: {
      type: String,
      default: "OEC functions under the umbrella of the:"
    },
    regulatory_oversight_items: [{
      text: String,
      nested_items: [{
        text: String
      }]
    }],

    // Licensing & Exclusivity Section
    licensing_title: {
      type: String,
      default: "Licensing & Exclusivity"
    },
    licensing_items: [{
      text: String
    }],

    // Key Legal Obligations Section
    legal_obligations_title: {
      type: String,
      default: "Key Legal Obligations OEC Complies With"
    },
    legal_obligations_table: [{
      regulation: String,
      purpose: String
    }],

    // Public Protection Measures Section
    protection_measures_title: {
      type: String,
      default: "Public Protection Measures"
    },
    protection_measures_items: [{
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

module.exports = mongoose.model("GoverningLaw", governingLawSchema);
