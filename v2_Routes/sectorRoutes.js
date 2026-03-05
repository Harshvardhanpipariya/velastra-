const express = require("express");
const router = express.Router();
const {
  createSector,
  getSectors,
} = require("../v2_Controllers/sectorController");

router.post("/CreateSector", createSector);
// 🔹 Get all Sectors
// Example: /v2/getSectors
router.get("/getSectors", getSectors);

module.exports = router;
