// models/Device.js
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    device_name: { type: String, required: true },
    installation_date: Date,
    software_version: String,
    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Device", deviceSchema);
