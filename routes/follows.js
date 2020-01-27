const express = require("express");

const service = require("../services/follows");

const router = express.Router();

router.post("/", async (req, res, next) => {
    const newFollow = {...req.body};
    try {
        const response = await service.addFollower(newFollow)
        res.status(201).json({message: "New follower added", response})
        return response;
    } catch (error){
        next(error)
    }
})

module.exports = router;