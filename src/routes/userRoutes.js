const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/UserController");
const {
  CheckDetails,
  isStudent,
  isAdmin,
  Auth,
} = require("../middlewares/UserMiddleWare");

router.post("/signup", signUp);
router.post("/login", CheckDetails, login);
router.post("/student", Auth, isStudent, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the Protected Routes for Students",
  });
});

router.post("/admin", Auth, isAdmin, (req, res) => {
  return res.status.json({
    success: true,
    message: "Welcome to the protected routes for Admin",
  });
});

module.exports = router;
