const express = require("express");
const { validateSignupData, validateLoginData } = require("../routes/utils/validator");
const { userExists, checkIfUserDetailsExists } = require("../routes/utils/userExists");
const { registerUser, verifyEmail, loginUser } = require("../services/auths");

const router = express.Router();

router.post("/register", validateSignupData, userExists, registerUser);
router.get("/verify/:id", verifyEmail);
router.get("/login", validateLoginData, checkIfUserDetailsExists, loginUser)

module.exports = router;
