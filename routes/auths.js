const express = require("express");
const { validateSignupData, validateLoginData } = require("../routes/utils/validator");
const { userExists, checkIfUserDetailsExists } = require("../routes/utils/userExists");
const { registerUser, verifyEmail, loginUser } = require("../services/auths");

const router = express.Router();

router.post("/register", validateSignupData, userExists, registerUser);
router.get("/verify/:id", verifyEmail);
router.get("/login", validateLoginData, checkIfUserDetailsExists, async (req, res) => {
    const {body} = req;
    try {
        const result = await loginUser(body);
        if (!result) {
            res.status(404).json({
                message: 'user not found'
            })
        }
        if (result.isVerified !== 1) {
            res.status(401).json({
                message:'please verify email address'
            })
        }
        res.status(200).json(result)
    } catch  (err) {
        console.log(err)
    }
})

module.exports = router;
