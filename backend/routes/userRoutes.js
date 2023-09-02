const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middleware/authMiddleware");

// router object
const router = express.Router();

//routes
//Login post
router.post("/login", loginController);

//Register post
router.post("/register", registerController);

//Auth Post
router.post("/getUserData", authMiddleware, authController);

//Apply Doctor Post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

module.exports = router;
