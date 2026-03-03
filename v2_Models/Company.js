// models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    company_name: { type: String, required: true },
    company_mail: { type: String, required: true },
    company_location: { type: String, required: true },
    sector: { type: mongoose.Schema.Types.ObjectId, ref: "Sector" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Company", companySchema);
