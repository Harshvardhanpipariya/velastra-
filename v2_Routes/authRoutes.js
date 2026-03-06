const express = require("express");
const router = express.Router();
const {
  logIn,
  signUp,
  forgotPassword,
} = require("../v2_Controllers/authController");



//request body for login:
//  { phone_no, password }
router.post("/login", logIn);


//request body for signup:
// { name, email, phone_no, password, company, sector }
router.post("/signup", signUp);


//request body for forgot password:
// { phone_no, newPassword, confirmPassword }
router.post("/forgot-password", forgotPassword);



module.exports = router;
