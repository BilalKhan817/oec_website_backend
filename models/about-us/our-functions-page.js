const mongoose = require("mongoose");

const ourFunctionsPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Our Functions"
  },
  subtitle: {
    type: String,
    required: false,
  },
  navbar_description: {
    type: String,
    required: false,
    default: "Core functions and services provided by OEC."
  },
  function_points: [{
    type: String
  }],
  introduction: {
    type: String,
    required: false,
  },
  core_functions: [{
    title: String,
    description: String,
    details: String,
    icon: String,
    image: String,
    order: Number,
  }],
  responsibilities: [{
    title: String,
    description: String,
    icon: String,
    order: Number,
  }],
  services_provided: [{
    category: String,
    services: [{
      title: String,
      description: String,
      icon: String,
    }],
    order: Number,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("OurFunctionsPage", ourFunctionsPageSchema);
