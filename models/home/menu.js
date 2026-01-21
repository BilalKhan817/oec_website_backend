const mongoose = require('mongoose');

// Sub-item schema (for items within tabs or simple dropdown items)
const subItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String, // FontAwesome class name, e.g., 'fas fa-building'
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  link_type: {
    type: String,
    enum: ['internal', 'external'], // internal = routerLink, external = href
    default: 'internal'
  },
  image_url: {
    type: String,
    trim: true
  },
  badge_text: {
    type: String,
    trim: true
  },
  badge_color: {
    type: String,
    trim: true
  },
  expandable: {
    type: Boolean,
    default: false
  },
  expand_content: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { _id: true });

// Tab schema (for mega menus with tabs)
const tabSchema = new mongoose.Schema({
  tab_title: {
    type: String,
    required: true,
    trim: true
  },
  tab_icon: {
    type: String,
    trim: true
  },
  tab_id: {
    type: String,
    required: true,
    trim: true
  },
  items: [subItemSchema],
  order: {
    type: Number,
    default: 0
  }
}, { _id: true });

// Main menu item schema
const menuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String, // FontAwesome class name
    required: true,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  link_type: {
    type: String,
    enum: ['internal', 'external', 'none'], // none = has dropdown
    default: 'internal'
  },
  has_dropdown: {
    type: Boolean,
    default: false
  },
  dropdown_type: {
    type: String,
    enum: ['simple', 'tabs', 'mega'], // simple = list, tabs = tabbed content, mega = grid layout
    default: 'simple'
  },
  dropdown_width: {
    type: String, // e.g., '800px', '600px'
    default: '400px'
  },
  tabs: [tabSchema], // For tab-style dropdowns
  items: [subItemSchema], // For simple dropdowns or mega menu items
  is_active: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
