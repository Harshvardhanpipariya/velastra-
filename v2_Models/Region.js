// models/Region.js
const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    region_name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);



// 🔥 Prevent duplicate region names within the same company
regionSchema.index({ region_name: 1, company: 1 }, { unique: true });

module.exports = mongoose.model("Region", regionSchema);
