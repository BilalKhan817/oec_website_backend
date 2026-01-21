const mongoose = require("mongoose");

const regionalOfficeSchema = new mongoose.Schema(
  {
    office_name: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      enum: ["north", "south", "east", "west", "central"],
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state_province: {
      type: String,
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
    office_head: {
      name: String,
      designation: String,
      phone: String,
      email: String,
      photo: String,
    },
    staff_count: {
      type: Number,
    },
    services_offered: [
      {
        type: String,
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
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RegionalOffice", regionalOfficeSchema);
