const express = require("express");
const service = require("../services/articles");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const articles = await service.findArticles();
        res.status(articles.statusCode).json(articles.data);
    } catch (error) {
        next(error);
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
})

module.exports = router;
