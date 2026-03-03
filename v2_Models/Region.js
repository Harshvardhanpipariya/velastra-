// models/Region.js
const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    region_name: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Region", regionSchema);
