const express = require("express");
const service = require("../services/articles");
const _ = require("lodash");
const formidable = require('formidable')

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const articles = await service.findArticles(userId ? userId : null);

    res.status(articles.statusCode).json(articles.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
