const express = require("express");
const service = require("../services/reactions");
const notification_service = require("../services/notifications");
const { authenticate } = require("./utils/loggedIn");
const _ = require("lodash");
const pusher = require("./utils/pusherConfig");
const router = express.Router();
const articles = require("../data/models/article-model");

router.post("/", authenticate, async (req, res) => {
  const incoming = req.body;
  const article = await articles.getArticlesById(req.body.articleId)
  console.log(req.body.articleId)
  const new_notification = {
    type: 'reactions',
    content: req.body.highlighted_text,
    isRead: false,
    actorId: req.user.subject,
    subjectId: article.authorId,
  };
  const reaction = _.omit(incoming, "notification");
  const userId = req.user.subject;
  try {
    reaction.articleId = article.id;
    reaction.authorId = article.authorId;
    reaction.reactorId = req.user.subject;
    const response = await service.addNewReaction(reaction);
    const notification = await notification_service.addNotification(
      new_notification
    );
    if (response && notification.subjectId === userId) {
      pusher.trigger(`$notifications-channel-${userId}`, "new-notification", notification);
    }
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Todo: fix followers endpoint to work
 */

router.get('/:articleId', authenticate, async (req, res) => {
  try {
    const userId = req.user.subject;
    const article = await articles.getArticlesById(req.params.articleId);
    const data = {
      reactorId: userId,
      articleId: article.id
    }
    const response = await service.getReactorReactions(data);
    return res.status(200).json(response);
  } catch(error) {
    res.status(500).json({
      error: error.message
    });
  }
})

module.exports = router;
