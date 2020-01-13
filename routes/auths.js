const express = require("express");
const { validateSignupData, validateLoginData } = require("../routes/utils/validator");
const { userExists } = require("../routes/utils/userExists");
const { registerUser, verifyEmail, loginUser } = require("../services/auths");

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

router.post("/verify/:id/:token", async (req, res) => {
  try {
    const { token, id } = req.params;
    const verifiedUser = await verifyEmail(token, id);
    res.status(200).json(verifiedUser);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post("/login", validateLoginData, async (req, res) => {
    try {
        const {body} = req;
        const result = await loginUser(body);
    
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
