const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    page_title: {
      type: String,
      default: "Get in Touch with OEC"
    },
    // Headquarters Section
    headquarters_section: {
      title: { type: String, default: "Headquarters" },
      icon: { type: String, default: "🏢" },
      address: { type: String },
      phones: [{ type: String }],
      emails: [{ type: String }],
      contact_persons: [
        {
          full_name: { type: String },
          designation: { type: String },
          phones: [{ type: String }],
          emails: [{ type: String }]
        }
      ],
      latitude: { type: Number, default: 33.6844 },
      longitude: { type: Number, default: 73.0479 }
    },
    // Regional Offices Section
    regional_offices_section: {
      title: { type: String, default: "Regional Offices" },
      icon: { type: String, default: "🏛️" },
      offices: [
        {
          city: { type: String },
          address: { type: String },
          phones: [{ type: String }],
          emails: [{ type: String }],
          contact_persons: [
            {
              full_name: { type: String },
              designation: { type: String },
              phone: { type: String },
              email: { type: String }
            }
          ],
          latitude: { type: Number, default: 33.6844 },
          longitude: { type: Number, default: 73.0479 }
        }
      ]
    },
    // OEC Travel Office Section
    travel_office_section: {
      title: { type: String, default: "OEC Travel Office" },
      icon: { type: String, default: "✈️" },
      address: { type: String },
      phones: [{ type: String }],
      emails: [{ type: String }],
      contact_persons: [
        {
          full_name: { type: String },
          designation: { type: String },
          phones: [{ type: String }],
          emails: [{ type: String }]
        }
      ],
      latitude: { type: Number, default: 33.6844 },
      longitude: { type: Number, default: 73.0479 }
    },
    // Feedback Section
    feedback_section: {
      title: { type: String, default: "Feedback" },
      icon: { type: String, default: "📝" },
      description: { type: String }
    },
    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUs", contactUsSchema);
