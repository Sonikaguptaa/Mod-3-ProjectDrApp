const express = require("express");
const {
  loginController,
  registerController,
  authController,
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

module.exports = router;
