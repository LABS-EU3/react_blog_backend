const express = require("express");

const service = require("../services/interests");

const router = express.Router();

router.post("/", async (req, res, next) => {
    const newInterest = {...req.body};
    try {
        const response = await service.addInterests(newInterest);
        res.status(201).json({message: "Added successfully", response})
        return response;
    } catch (error){
        next(error);
    }
})

router.get("/", async (req, res, next) => {
    try {
        const response = await service.getInterests()
        res.status(200).json({message: "Success", response})
        return response;
    }
    catch (error){
        next(error)
    }
})

module.exports = router;