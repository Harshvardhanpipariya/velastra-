const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompanies,
} = require("../v2_Controllers/companyController");

/* =========================
   CREATE COMPANY
   POST /v2/companies
========================= */
router.post("/createCompany", createCompany);

/* =========================
   GET COMPANIES BY SECTOR
   GET /v2/getCompaniesBySector?sector=IT
========================= */
router.get("/getCompaniesBySector", getCompanies);

module.exports = router;
