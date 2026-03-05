// v2_Controllers/sectorController.js

const Sector = require("../v2_Models/Sector.js");

/* =========================
   CREATE SECTOR (Setter)
========================= */
const createSector = async (req, res) => {
  try {
    const { sector_name } = req.body;

    if (!sector_name) {
      return res.status(400).json({
        message: "Sector name is required",
      });
    }
console.log("Creating sector with name:", sector_name);
    const existing = await Sector.findOne({ sector_name });
    if (existing) {
      return res.status(409).json({
        message: "Sector already exists",
      });
    }

    const newSector = await Sector.create({ sector_name });

    return res.status(201).json({
      message: "Sector created successfully",
      sector: newSector,
    });

  } catch (error) {
    console.error("Error creating sector:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL SECTORS (Getter)
========================= */
const getSectors = async (req, res) => {
  try {
    const sectors = await Sector
      .find()
      .sort({ createdAt: 1 })
      .select("sector_name");

    return res.status(200).json(sectors);

  } catch (error) {
    console.error("Error fetching sectors:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSector,
  getSectors,
};