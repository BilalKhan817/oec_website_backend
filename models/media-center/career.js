const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    grade: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    deadline: { type: Date, default: null },
    applyLink: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const careerFormSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    file_url: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);
const CareerForm = mongoose.model("CareerForm", careerFormSchema);

module.exports = { JobPosting, CareerForm };
