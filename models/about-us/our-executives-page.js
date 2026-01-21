const mongoose = require("mongoose");

const ourExecutivesPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Our Executives"
  },
  subtitle: {
    type: String,
    required: false,
  },
  navbar_description: {
    type: String,
    required: false,
    default: "Senior management and leadership team"
  },
  leadership_items: [{
    title: String,
    image: String,
    link: String,
    order: Number
  }],
  introduction: {
    type: String,
    required: false,
  },
  hero_image: {
    type: String,
    required: false,
  },
  executives: [{
    name: String,
    designation: String,
    department: String,
    photo: String,
    bio: String,
    email: String,
    phone: String,
    linkedin: String,
    order: Number,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("OurExecutivesPage", ourExecutivesPageSchema);
