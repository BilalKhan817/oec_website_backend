const mongoose = require("mongoose");

const mouSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  partner_name: {
    type: String,
    required: true,
  },
  partner_logo: {
    type: String,
    required: false,
  },
  partner_country: {
    type: String,
    required: false,
  },
  mou_type: {
    type: String,
    enum: ['bilateral', 'multilateral', 'academic', 'industry', 'government'],
    required: true,
  },
  signed_date: {
    type: Date,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: false,
  },
  scope: {
    type: String,
    required: true,
  },
  objectives: [String],
  key_areas: [String],
  benefits: [String],
  signing_ceremony_images: [String],
  document_url: {
    type: String,
    required: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("Mou", mouSchema);
