const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");
const router = express.Router();

// post single doc info
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//post update profile
router.post("/updateProfile", authMiddleware, updateProfileController);

//post get single Doc Info
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//GET Appointments
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
