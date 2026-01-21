const mongoose = require("mongoose");

const navbarSubmenuSchema = new mongoose.Schema({
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NavbarMenu',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
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

module.exports = mongoose.model("NavbarSubmenu", navbarSubmenuSchema);
