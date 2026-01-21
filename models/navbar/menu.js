const mongoose = require("mongoose");

const navbarMenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  hasSubmenu: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  openInNewTab: {
    type: Boolean,
    default: false,
  },
  cssClass: {
    type: String,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("NavbarMenu", navbarMenuSchema);
