const express = require("express");
const article_services = require("../services/articles");
const user_services = require("../services/users");
const router = express.Router();
const { getArticles } = article_services;
const { getUsers } = user_services;

router.post("/", async (req, res) => {
  const query = req.query.resources;
  try {
    const users = (await getUsers()).data.data;
    const users_results = users.filter(user =>
      new RegExp(query).test(user.full_name)
    );
    const articles = (await getArticles()).data.data;
    const aritlces_results = articles.filter(article =>
      new RegExp(query).test(article.title)
    );

    console.log(users, articles, query, users_results, aritlces_results);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
