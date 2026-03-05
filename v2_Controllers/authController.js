const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../v2_Models/User.js");
const Sector = require("../v2_Models/Sector.js");
const Company = require("../v2_Models/Company.js");
/* =========================
   LOGIN
========================= */
const logIn = async (req, res) => {
  try {
    const { phone_no, password } = req.body;

    if (!phone_no || !password) {
      return res.status(400).json({
        message: "Phone number and password are required",
      });
    }

    // 🔍 Find user by phone number
    const user = await User.findOne({ phone_no });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 🎟 Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        phone_no: user.phone_no,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        company: user.company,
        regions: user.regions,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   SIGN UP
========================= */
const signUp = async (req, res) => {
  try {
    const { name, email, phone_no, password, company, sector } = req.body;

    // 🔎 Basic Validation
    if (!name || !email || !phone_no || !password) {
      return res.status(400).json({
        message: "Name, email, phone number and password are required",
      });
    }

    // 🔐 PIN validation
    if (!/^\d{4}$/.test(password)) {
      return res.status(400).json({
        message: "PIN must be exactly 4 digits",
      });
    }

    // 🔹 1️⃣ Fetch company from DB
    const companyDoc = await Company.findOne({ company_name: company });

    if (!companyDoc) {
      return res.status(400).json({
        message: "Company is invalid",
      });
    }

    // 🔹 2️⃣ Validate sector(s) under that company
    let sectorIds = [];

    if (sector) {
      const sectorArray = Array.isArray(sector) ? sector : [sector];

      const validSectors = await Sector.find({
        sector_name: { $in: sectorArray },
      });

      if (validSectors.length !== sectorArray.length) {
        return res.status(400).json({
          message: "One or more sectors are invalid",
        });
      }

      sectorIds = validSectors.map((s) => s._id);
    }

    // 🔍 Check duplicate user
    const existingUser = await User.findOne({
      $or: [{ email }, { phone_no }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email or phone number already exists",
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 Create user (FIXED PART)
    const newUser = await User.create({
      name,
      email,
      phone_no,
      password: hashedPassword,
      company: companyDoc._id, // ✅ Save ObjectId
      sector: sectorIds, // ✅ Save ObjectIds
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone_no: newUser.phone_no,
        company: companyDoc.company_name,
        sector: sector,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email or phone number already exists",
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
};
/* =========================
   FORGOT PASSWORD
========================= */
const forgotPassword = async (req, res) => {
  try {
    const { phone_no, newPassword, confirmPassword } = req.body;

    // 🔎 Required fields check
    if (!phone_no || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Phone number, new password and confirm password are required",
      });
    }

    // 🔐 Check password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // 🔐 Validate PIN format (exactly 4 digits)
    if (!/^\d{4}$/.test(newPassword)) {
      return res.status(400).json({
        message: "PIN must be exactly 4 digits",
      });
    }

    const cleanPhone = phone_no.trim();

    // 🔍 Find user
    const user = await User.findOne({ phone_no: cleanPhone });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 📝 Update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { logIn, signUp, forgotPassword };
