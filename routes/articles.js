const express = require("express");
const service = require("../services/articles");
const { authenticate } = require("./utils/loggedIn");
const _ = require("lodash");
const formidable = require("formidable");

const router = express.Router();

router.post("/like/:id", authenticate, async (req, res, next) => {
  const articleId = req.params.id;
  const userId = req.user ? req.user.subject : null;
  try {
    if (!userId) {
      return res
        .status(404)
        .json({ message: "Must be logged in to like article." });
    }
    await service.likeArticle(articleId, userId);
    const likeCount = await service.getArticleLikeCount(articleId);
    res.status(200).json({
      message: "Successfully liked article",
      userId,
      articleId,
      newLikeCount: likeCount.count
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", authenticate, async (req, res, next) => {
  try {
    const articles = await service.findArticles(
      req.user ? req.user.subject : null
    );
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

router.post("/publish", authenticate, async (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async function(err, fields, files) {
    // eslint-disable-next-line no-unused-vars
    let result = "";
    if (err) {
      console.error(err.message);
      return;
    }
    if (files.image) {
      result = await service.uploadFile(files.image);
    }

    const article = Object.assign({}, fields);
    const tagsToAdd = JSON.parse(article.tags);
    let articleToAdd = _.omit(article, ["tags", "image"]);
    articleToAdd.coverImageUrl =
      "https://getinsightly.s3-us-west-2.amazonaws.com/placeholder-1-1100x617.png";
    const responseTags = [];
    if (result) {
      articleToAdd.coverImageUrl = result;
    }

    const isArticlePresent = await service.checkIfArticleExistsToSave(
      articleToAdd.custom_id
    );
    if (!isArticlePresent) {
      try {
        const response = await service.addNewArticle(articleToAdd);
        const { id } = response;
        if (tagsToAdd.length) {
          for (const tag of tagsToAdd) {
            const savedTag = await service.addTag(tag["name"], id);
            responseTags.push(savedTag);
          }
        }
        return res.status(200).json({ ...response, tags: responseTags });
      } catch (error) {
        res.status(500).json({
          error: error.message
        });
      }
    } else {
      try {
        const updatedArticle = service.updateArticle(articleToAdd.custom_id);
        if (tagsToAdd.length) {
          for (const tag of tagsToAdd) {
            const savedTag = await service.addTag(
              tag["name"],
              updatedArticle.id
            );
            responseTags.push(savedTag);
          }
        }
        return res.status(201).json({ ...updatedArticle, justUpdated: true });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

router.post("/save", authenticate, async (req, res) => {
  const article = req.body;
  const articleToAdd = _.omit(article, "tags");
  const isArticlePresent = await service.checkIfArticleExistsToSave(
    articleToAdd.custom_id
  );
  if (!isArticlePresent) {
    try {
      const response = await service.addNewArticle(articleToAdd);
      console.log(response);
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  } else {
    try {
      const response = service.updateArticle(articleToAdd.custom_id);
      return res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
});

router.get("/:articleId", async (req, res, next) => {
  try {
    // check if userid is sent to by checking token, if yes then we need to add his reactions on that article as part of the response payload
    const { articleId } = req.params;
    const result = await service.getArticleInfo(articleId);
    res.status(result.statusCode).json(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
