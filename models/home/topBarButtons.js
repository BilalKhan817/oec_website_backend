const mongoose = require('mongoose');

// Top Bar Button Schema (for the green header buttons)
const topBarButtonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String, // FontAwesome class name
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  link_type: {
    type: String,
    enum: ['internal', 'external'],
    default: 'internal'
  },
  button_style: {
    type: String,
    enum: ['default', 'highlight'], // highlight for special buttons like "EPS Korea"
    default: 'default'
  },
  show_on_mobile: {
    type: Boolean,
    default: true
  },
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

const TopBarButton = mongoose.model('TopBarButton', topBarButtonSchema);
module.exports = TopBarButton;
