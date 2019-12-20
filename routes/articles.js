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

module.exports = router;
