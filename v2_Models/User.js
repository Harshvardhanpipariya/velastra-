// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { 
    type: String, 
    required: true, 
    unique: true, 
  },

  password: { type: String, required: true },

//   access: {
//     type: String,
//     enum: ["admin", "manager", "user"],
//     default: "user"
//   },

  company: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Company" 
  },

  // 🔥 Many-to-Many stored directly
  regions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Region" }
  ]

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);