const express = require("express");
const router = express.Router();
const {
  logIn,
  signUp,
  forgotPassword,
} = require("../v2_Controllers/authController");

router.post("/login", logIn);
router.post("/signup", signUp);
router.post("/forgot-password", forgotPassword);

module.exports = router;
