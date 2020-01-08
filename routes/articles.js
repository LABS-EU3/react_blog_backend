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
  
  let form = new formidable.IncomingForm();
  form.parse(req, async function(err, fields, files) {
    if (err) {
      console.error(err.message);
      return;
    }

    const result = await service.uploadFile(files.image);
    
    const response = {
      "success" : 1,
      "file": {
          "url" : result,
          // ... and any additional fields you want to store, such as width, height, color, extension, etc
      }
    }
    res.status(200).json(response);
  });
  
  
});

router.post('/fetchUrl', (req, res) => {
  console.log(req)
})

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
    const articleToAdd = _.omit(article, "tags");
    const response = await service.addNewArticle(articleToAdd);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
