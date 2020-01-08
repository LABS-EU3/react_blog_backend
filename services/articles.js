const AWS = require('aws-sdk');
const fs = require('fs');
const articles = require("../data/models/article-model");
const config = require('../config');

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION
});

async function findArticles() {
  const allArticles = await articles.getArticles();

  if (!allArticles) {
    return { statusCode: 404, data: { message: "Articles not found." } };
  } else {
    return { statusCode: 200, data: { data: allArticles } };
  }
}

async function addNewArticle(article) {
  const response = await articles.addArticle(article);
  return response;
}

async function addTag(tag, id) {
  const response = await articles.addTag({ name: tag, articleId: id });
  return response;
}

module.exports = {
  findArticles,
  addNewArticle,
  addTag
};
