const express = require("express");
const bcrypt = require('bcryptjs');
const { validateSignupData, validateLoginData } = require("../routes/utils/validator");
const { userExists, checkIfUserDetailsExists } = require("../routes/utils/userExists");
const { registerUser, verifyEmail, loginUser } = require("../services/auths");

const router = express.Router();

router.post("/register", validateSignupData, userExists, registerUser);
router.get("/verify/:id", verifyEmail);
router.post("/login", validateLoginData, async (req, res) => {
    const {body} = req;
    try {
        const result = await loginUser(body);
        //console.log(result)
        if (result) {
            // if (result.isVerified !== "1") {
            //     res.status(401).json({
            //         message:'please verify email address'
            //     })
            // }
            res.status(200).json(result)
        }
        
    } catch  (err) {
        console.log(err)
    }
})

module.exports = router;
