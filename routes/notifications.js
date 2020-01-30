const express = require("express");
const router = express.Router();
const { authenticate } = require("./utils/loggedIn");
const service = require("../services/notifications");
const pusher = require("./utils/pusherConfig");

router.post("/", authenticate, async (req, res, next) => {
  const notification = req.body;
  try {
    const userId = req.user.subject;
    const response = service.addNotification(notification);
    if (response) {
      if (response.subjectId === userId) {
        pusher.trigger("notifications-channel", "new-notification", {
          response
        });
      }
    }
    return res.status(201).json({ message: "Added successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
