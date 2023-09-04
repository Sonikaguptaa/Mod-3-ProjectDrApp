const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
} = require("../controllers/doctorCtrl");
const router = express.Router();

// post single doc info
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//post update profile
router.post("/updateProfile", authMiddleware, updateProfileController);

//post get singlr Doc Info
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);
module.exports = router;
