const express = require("express");

const service = require("../services/interests");

const { authenticate } = require("./utils/loggedIn");

const router = express.Router();

router.post("/", authenticate, async (req, res, next) => {
  const interests = req.body;
  try {
    const userId = req.user.subject;
    interests.map(interest => {
      service.addInterests({ name: interest, userId });
    });
    return res.status(201).json({ message: "Added successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await service.getInterests();
    res.status(200).json({ message: "Success", response });
    return response;
  } catch (error) {
    next(error);
  }
});

router.delete("/", authenticate, async (req, res, next) => {
  const interests = req.body;
  try {
    const userId = req.user.subject;
    const remove = await service.removeInterests(userId, interests);
    const response = await service.getInterestsByUserId(userId);
    if (remove === interests.length) {
      return res.status(200).json({
        message: "Successfully deleted",
        userId,
        deleted: interests,
        new: response
      });
    } else {
      return res
        .status(404)
        .json({
          message: "User does not have interests provided in req body",
          userId,
          interests
        });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
