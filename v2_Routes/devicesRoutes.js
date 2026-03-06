const express = require("express");
const router = express.Router();
const { createDevice,fetchAllDevices } = require("../v2_Controllers/deviceController");



// 🔹 Create Device
// Example request body for creating a new device
// {
//     "device_name": "D2",
//     "region_name": "Churcha East",
//     "installation_date": "2026-03-02T11:30:00Z",
//     "software_version": "v1.1.0"
//   }
router.post("/createDevice", createDevice);


//simply get request to fetch all devices
router.get("/fetchAllDevices", fetchAllDevices);

module.exports = router;
