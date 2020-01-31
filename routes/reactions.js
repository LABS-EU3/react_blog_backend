const express = require("express");
<<<<<<< HEAD
const service = require("../services/reactions");
const notification_service = require("../services/notifications");
const { authenticate } = require("./utils/loggedIn");
const _ = require("lodash");
const pusher = require("./utils/pusherConfig");
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const incoming = req.body;
  const new_notification = req.body.notification;
  const reaction = _.omit(incoming, "notification");
  const userId = req.user.subject;
  try {
    const response = await service.addNewReaction(reaction);
    const notification = await notification_service.addNotification(
      new_notification
    );
    if (response && notification.subjectId === userId) {
      pusher.trigger(`$notifications-channel-${userId}`, "new-notification", notification);
=======
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
>>>>>>> fd25e6ac0a6aef245d5fa2be4a63f6d1e230eb37
    }
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
