const express = require("express");
const router = express.Router();

const {
  createRegion,
  getRegions,
} = require("../v2_Controllers/regionController");

// 🔹 Create Region
router.post("/createRegion", createRegion);

// 🔹 Get Regions
// Example: /v2/getRegionsByCompanyId?companyId=123
router.get("/getRegionsByCompanyId", getRegions);

module.exports = router;
