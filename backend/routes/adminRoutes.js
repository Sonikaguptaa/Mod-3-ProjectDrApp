const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllUserController,
  getAllDoctorController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");

// router object
const router = express.Router();

//get all users Get
router.get("/getAllUsers", authMiddleware, getAllUserController);

// get all Doctors Get
router.get("/getAllDoctors", authMiddleware, getAllDoctorController);

//change accoount status
// router.post(
//   "/changeAccountStatus",
//   authMiddleware,
//   changeAccountStatusController
// );

router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
