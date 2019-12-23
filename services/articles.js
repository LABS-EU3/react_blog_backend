const articles = require("../data/models/article-model");

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
