const express = require("express");
const article_services = require("../services/articles");
const user_services = require("../services/users");
const router = express.Router();
const { getArticles } = article_services;
const { getUsers } = user_services;

router.get("/", async (req, res) => {
  const query = req.query.resources;
  const regex = new RegExp(query, "i");
  try {
    const results = await Promise.all([getUsers(), getArticles()]);
    const users = results[0].data.data;
    const articles = results[1];
    const filtered_users_result = users.filter(user =>
      regex.test(user.fullname)
    );
    const filtered_articles_result = articles.filter(article =>
      regex.test(article.title)
    );
    return res
      .status(200)
      .json({
        insights: filtered_articles_result,
        people: filtered_users_result
      });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
