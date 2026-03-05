// models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    company_mail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    company_location: {
      type: String,
      required: true,
      trim: true,
    },

    sector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sector",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// 🔥 Prevent duplicate company names inside same sector
companySchema.index({ company_name: 1, sector: 1 }, { unique: true });

module.exports = mongoose.model("Company", companySchema);
