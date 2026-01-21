const mongoose = require("mongoose");

const travelOfficePageSchema = new mongoose.Schema(
  {
    page_title: {
      type: String,
      default: "Travel Office",
    },
    office_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
    },
    country: {
      type: String,
      default: "Pakistan",
    },
    phone_numbers: [
      {
        label: String,
        number: String,
      },
    ],
    fax_numbers: [
      {
        label: String,
        number: String,
      },
    ],
    email_addresses: [
      {
        label: String,
        email: String,
      },
    ],
    working_hours: {
      weekdays: String,
      saturday: String,
      sunday: String,
    },
    services_offered: [
      {
        service_name: String,
        description: String,
        fee: String,
      },
    ],
    map_location: {
      latitude: Number,
      longitude: Number,
      embed_url: String,
    },
    office_images: [
      {
        type: String,
      },
    ],
    additional_info: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TravelOfficePage", travelOfficePageSchema);
