
const articles = require("../data/models/article-model");

async function findArticles(userId) {
  const allArticles = await articles.getArticles(userId ? userId : null);

  if (!allArticles) {
    return { statusCode: 404, data: { message: "Articles not found." } };
  } else {
    return { statusCode: 200, data: { data: allArticles } };
  }
}

module.exports = {
 findArticles
};