const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/UserController");
const { CheckDetails } = require("../middlewares/UserMiddleWare");

router.post("/signup", signUp);
router.post("/login", CheckDetails, login);

module.exports = router;
