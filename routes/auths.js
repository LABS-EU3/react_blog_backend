const express = require("express");
const { validateSignupData } = require("../routes/utils/validator");
const { userExists } = require("../routes/utils/userExists");
const { registerUser, verifyEmail } = require("../services/auths");

const router = express.Router();

router.post("/register", validateSignupData, userExists, async (req, res) => {
  try {
    let user = req.body;
    const newUser = await registerUser(user);
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.get("/verify/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const verifiedUser = await verifyEmail(id);
    res.status(200).json(verifiedUser);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
