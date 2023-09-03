const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllUserController,
  getAllDoctorController,
} = require("../controllers/adminCtrl");

// router object
const router = express.Router();

//get all users Get
router.get("/getAllUsers", authMiddleware, getAllUserController);

router.get("/getAllDoctors", authMiddleware, getAllDoctorController);

module.exports = router;
