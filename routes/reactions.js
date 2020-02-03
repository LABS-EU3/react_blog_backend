const express = require("express");
const service = require('../services/reactions');
const { authenticate } = require("./utils/loggedIn");


const router = express.Router();

router.post('/', authenticate, async(req, res) => {

    const reaction = req.body;
    console.log(reaction)
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