const express = require("express");
const service = require("../services/articles");
const loggedIn = require("./utils/loggedIn");
const _ = require("lodash");
const formidable = require("formidable");

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

router.post("/uploadCover", async (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async function(err, fields, files) {
    console.log("files", fields);
    if (err) {
      console.error(err.message);
      return;
    }
    const result = await service.uploadFile(files.image);
    const coverToAdd = { url: result, articleId: fields.articleId };
    try {
      const response = await service.addNewCover(coverToAdd);
      const { id } = response;
      return res.status(200).json(id);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });
});

router.post("/uploadFile", async (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async function(err, fields, files) {
    console.log(files);
    if (err) {
      console.error(err.message);
      return;
    }

    const result = await service.uploadFile(files);
    console.log(files);

    const response = {
      success: 1,
      file: {
        url: result
        // ... and any additional fields you want to store, such as width, height, color, extension, etc
      }
    };
    res.status(200).json(response);
  });
});

router.post("/fetchUrl", (req, res) => {
  console.log(req, res);
});

router.post("/publish", async (req, res) => {
  console.log(req.body)
  const article = req.body;
  const tagsToAdd = article.tags;
  const articleToAdd = _.omit(article, "tags");
  articleToAdd.body = JSON.stringify(articleToAdd.body);
  const responseTags = [];
  try {
    const response = await service.addNewArticle({
      ...articleToAdd,
      coverImageUrl: ""
    });
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
    console.log(response)
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.get("/:articleId", async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const result = await service.getArticleInfo(articleId);
    res.status(result.statusCode).json(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
