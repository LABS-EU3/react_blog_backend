const express = require("express");
const article_services = require("../services/articles");
const user_services = require("../services/users");
const router = express.Router();
const { getArticles } = article_services;
const { getUsers } = user_services;

router.post("/", async (req, res) => {
  const query = req.query.resources;
  try {
    const results = await Promise.all([
      getUsers().data.data,
      getArticles().data.data
    ]);
    const users_results = results[0].filter(user =>
      new RegExp(query).test(user.full_name)
    );
    const aritlces_results = results[1].filter(article =>
      new RegExp(query).test(article.title)
    );
    const response = users_results.concat(aritlces_results);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
