const mongoose = require("mongoose");

const faqSettingsSchema = new mongoose.Schema(
  {
    phone: { type: String, default: "051-9253252", trim: true },
    email: { type: String, default: "info@oec.gov.pk", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FaqSettings", faqSettingsSchema);
