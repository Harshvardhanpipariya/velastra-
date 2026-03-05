const express = require("express");
const router = express.Router();
const {
  insertRealtimeData,
} = require("../v2_Controllers/Real_Time_Data_Controller/DataController");

router.post("/insert", insertRealtimeData);

module.exports = router;
