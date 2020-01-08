const express = require("express");
const service = require("../services/articles");
const _ = require("lodash");
const formidable = require('formidable')

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const articles = await service.findArticles();
    res.status(articles.statusCode).json(articles.data);
  } catch (error) {
    next(error);
  }
});

router.post("/uploadFile", async (req, res) => {
  const response = {
    "success" : 1,
    "file": {
        "url" : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
        // ... and any additional fields you want to store, such as width, height, color, extension, etc
    }
  }
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.error(err.message);
      return;
    }
    // send image to services
    res.json(response);
    console.log(files)
  });
  
  // res.status(200).json(response);
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
