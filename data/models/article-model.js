const db = require("../dbConfig");

async function getArticles() {
  try {
    const response = await db("articles as a")
      .select("a.id", "title", "body", "authorId", "createdAt", "updatedAt")
      .where("a.authorId", "=", "u.id")
      .leftJoin("users as u", "u.id", "=", "a.authorId");
    return response;
  } catch (error) {
    console.log(error);
  }
}



async function addArticle(article) {
  try {
    const [id] = await db("articles").insert(article, "id");
    const response = await findArticleById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function findArticleById(id) {
  try {
    const article = await db("articles")
      .where({ id: id })
      .first();
    return article;
  } catch (error) {
    console.log(error);
  }
}

async function addTag(tag) {
  try {
    const ids = await db("tags").insert(tag, "id");
    const id = ids[0];
    const response = await findTagById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getArticleTags(articleId) {
  try {
    const tags = await db("tags").where({ articleId: articleId });
    return tags;
  } catch (error) {
    console.log(error);
  }
}

async function findTagById(id) {
  try {
    const tag = await db("tags")
      .where({ id: id })
      .first();
    return tag;
  } catch (error) {
    console.log(error);
  }
}

async function getArticlesById(id) {
  try {
    const article = await db("articles")
      .select(
        "articles.id",
        "title",
        "body",
        "authorId",
        "createdAt",
        "updatedAt"
      )
      .where({ id: id })
      .first();
    const [{ fullname }] = await db("users")
      .select("fullname")
      .where({ id: article.authorId });
    return { ...article, authorName: fullname };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getArticles,
  addArticle,
  getArticleTags,
  addTag,
  getArticlesById
};
