const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  DeleteAllNotificationController,
  getAllDoctorsController,
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

//Notification post
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// delete
router.post(
  "/delete-all-notification",
  authMiddleware,
  DeleteAllNotificationController
);
// get all doctor
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
module.exports = router;
