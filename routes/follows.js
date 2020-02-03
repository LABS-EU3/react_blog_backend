const express = require("express");
const { authenticate } = require("./utils/loggedIn");
const service = require("../services/follows");
const router = express.Router();

router.post("/", authenticate, async (req, res, next) => {
  const newFollowIds = req.body;
  try {
    const userId = req.user.subject;
    Promise.all(
      newFollowIds.map(id => {
        service.addFollower({ followerId: userId, followingId: id });
      })
    )
      .then(() => res.status(201).json({ message: "New followers added" }))
      .catch(err => console.log(err));
  } catch (error) {
    next(error);
  }
});

router.get("/potential", authenticate, async (req, res, next) => {
    const userId = req.user.subject;
    try {
        const response = await service.getUsersToFollow(userId);
        res.status(200).json(response.slice(0,10))
    }
    catch(error) {
        next(error);
    }
})

module.exports = router;
