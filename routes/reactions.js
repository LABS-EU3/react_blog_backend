const express = require("express");
const service = require("../services/reactions");
const { checkIfUserIsLoggedIn } = require("./utils/userIsLoggedIn");
const notification_service = require("../services/notifications");
const _ = require("lodash");
const pusher = require("./utils/pusherConfig");
const router = express.Router();

router.post("/", checkIfUserIsLoggedIn, async (req, res) => {
  const incoming = req.body;
  const new_notification = req.body.notification;
  const reaction = _.omit(incoming, "notification");
  const userId = req.user.subject;
  try {
    const response = await service.addNewReaction(reaction);
    const notification = await notification_service.addNotification(
      new_notification
    );
    if (response) {
      if (notification.subjectId === userId) {
        pusher.trigger("notifications-channel", "new-notification", {
          notification
        });
      }
    }
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
