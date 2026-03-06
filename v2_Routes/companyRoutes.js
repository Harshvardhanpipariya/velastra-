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
// Example request body for creating a new company
// {
//     "company_name": "Tech Corp",
//     "company_mail": "info@techcorp.com",
//     "company_location": "New York",
//     "sector_name": "IT"
// }
router.post("/createCompany", createCompany);



/* =========================
   GET COMPANIES BY SECTOR
   GET /v2/getCompaniesBySector?sector=IT
========================= */
router.get("/getCompaniesBySector", getCompanies);

module.exports = router;
