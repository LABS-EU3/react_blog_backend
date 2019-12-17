const express = require("express");
const { validateSignupData } = require("../routes/utils/validator");
const { userExists } = require("../routes/utils/userExists");
const { registerUser, verifyEmail } = require("../services/auths");

const router = express.Router();

router.post("/register", validateSignupData, userExists, registerUser);
router.get("/verify/:id", verifyEmail);

module.exports = router;
