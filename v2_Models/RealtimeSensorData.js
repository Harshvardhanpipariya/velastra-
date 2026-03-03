// models/RealtimeSensorData.js
const mongoose = require("mongoose");

const realtimeSensorDataSchema = new mongoose.Schema(
  {
    // 🔥 Fully dynamic metadata
    meta: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // Time-series required field
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },

    // 🔥 Fully dynamic sensor payload
    sensors: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    collection: "realtime_sensor_data",
  },
);

module.exports = mongoose.model("RealtimeSensorData", realtimeSensorDataSchema);
