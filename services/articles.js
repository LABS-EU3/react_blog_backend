
const articles = require("../data/models/article-model");

async function findArticles() {
  const allArticles = await articles.getArticles();

  if (!allArticles) {
    return { statusCode: 404, data: { message: "Articles not found." } };
  } else {
    return { statusCode: 200, data: { data: allArticles } };
  }
}

async function getArticleInfo(articleId) {
  const article = await articles.getArticlesById(articleId);

  if (!article) {
    return { statusCode: 404, data: { message: `Cannot find article id of ${articleId}. `} };
  } else {
    return { statusCode: 200, data: { article } };
  }
}
module.exports = {
 findArticles, getArticleInfo
};