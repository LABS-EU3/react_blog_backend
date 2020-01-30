const express = require("express");

const service = require("../services/follows");
const { authenticate } = require("./utils/loggedIn");
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

module.exports = router;
