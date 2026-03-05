// models/RealtimeSensorData.js
const mongoose = require("mongoose");

const realtimeSensorDataSchema = new mongoose.Schema(
  {
    meta: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },

    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

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

realtimeSensorDataSchema.index({ timestamp: -1 });
realtimeSensorDataSchema.index({ "meta.device": 1, timestamp: -1 });

module.exports = mongoose.model("RealtimeSensorData", realtimeSensorDataSchema);
