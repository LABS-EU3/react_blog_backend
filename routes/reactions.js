const express = require("express");
const service = require('../services/reactions');
const { checkIfUserIsLoggedIn } = require('./utils/userIsLoggedIn')

const router = express.Router();

router.post('/reactions', checkIfUserIsLoggedIn, async(req, res) => {
    const reaction = req.body;
    try {
        const response = await service.addNewReaction(reaction);
        return res.status(201).json(response);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
    
})

module.exports = router;