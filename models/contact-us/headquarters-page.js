const mongoose = require("mongoose");

const headquartersPageSchema = new mongoose.Schema(
  {
    page_title: {
      type: String,
      default: "Headquarters",
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
    departments: [
      {
        name: String,
        head: String,
        phone: String,
        email: String,
        extension: String,
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

module.exports = mongoose.model("HeadquartersPage", headquartersPageSchema);
