const express = require("express");
const service = require("../services/articles");
const _ = require("lodash");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const articles = await service.findArticles();
    res.status(articles.statusCode).json(articles.data);
  } catch (error) {
    next(error);
  }
});

router.post("/publish", async (req, res) => {
  const article = req.body;
  const tagsToAdd = article.tags;
  const articleToAdd = _.omit(article, "tags");
  const responseTags = [];
  try {
    const response = await service.addNewArticle(articleToAdd);
    const { id } = response;
    for (const tag of tagsToAdd) {
      const savedTag = await service.addTag(tag, id);
      responseTags.push(savedTag);
    }
    console.log(responseTags);
    return res.status(200).json({ ...response, tags: responseTags });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post("/save", async (req, res) => {
  const article = req.body;
  try {
    const response = await service.addNewArticle(article);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
