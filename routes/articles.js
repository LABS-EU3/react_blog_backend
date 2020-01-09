const express = require("express");
const service = require("../services/articles");
const loggedIn = require("./utils/loggedIn");
const router = express.Router();

router.get("/", loggedIn, async (req, res, next) => {
  try {
    const articles = await service.findArticles(
      req.decodedToken ? req.decodedToken.subject : null
    );

    res.status(articles.statusCode).json(articles.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
