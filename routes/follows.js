const express = require("express");
const notification_service = require("../services/notifications");
const _ = require("lodash");
const pusher = require("./utils/pusherConfig");
const service = require("../services/follows");
const { authenticate } = require("./utils/loggedIn");
const router = express.Router();

// router.post("/", authenticate, async (req, res, next) => {
//   const incoming = { ...req.body };
//   const new_notification = {
//     type: 'reactions',
//     content: req.body.highlighted_text,
//     isRead: false,
//     actorId: req.body.reactorId,
//     subjectId: req.body.authorId,
//   };
//   const newFollow = _.omit(incoming, "notification");
//   const userId = req.user.subject;

//   try {
//     const response = await service.addFollower(newFollow);
//     const notification = await notification_service.addNotification(
//       new_notification
//     );
//     if (response) {
//       pusher.trigger(`notifications-channel-${userId}`, "new-notification", {
//         notification
//       });
//     }
//     res.status(201).json({ message: "New follower added", response });
//     return response;
//   } catch (error) {
//     next(error);
//   }
// });

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
});

module.exports = router;
