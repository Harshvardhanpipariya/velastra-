// v2_Controllers/regionController.js

const Region = require("../v2_Models/Region");
const Company = require("../v2_Models/Company");

/* =========================
   CREATE REGION (Setter)
========================= */
const createRegion = async (req, res) => {
  try {
    const { region_name, companyId } = req.body;

    if (!region_name || !companyId) {
      return res.status(400).json({
        message: "Region name and companyId are required",
      });
    }

    // 🔎 Check if company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }
console.log("Creating region with data:", { region_name, companyId, company_name: company.company_name });
    const newRegion = await Region.create({
      region_name,
      company: companyId,
    });

    return res.status(201).json({
      message: "Region created successfully",
      region: newRegion,
    });

  } catch (error) {
    console.error("Error creating region:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET REGIONS (Getter)
========================= */
const getRegions = async (req, res) => {
  try {
    const { companyId } = req.query;

    let filter = {};
    if (companyId) {
      filter.company = companyId;
    }

    const regions = await Region
      .find(filter)
      .populate("company", "company_name")
      .sort({ createdAt: 1 });

    return res.status(200).json(regions);

  } catch (error) {
    console.error("Error fetching regions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRegion,
  getRegions,
};