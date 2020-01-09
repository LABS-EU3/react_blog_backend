const db = require("../dbConfig");

async function getArticles(userId) {
  let articles = [];
  try {
    let trending = await db("articles as a")
      .select(
        "a.id",
        "title",
        "body",
        "authorId",
        "u.username as author",
        "createdAt",
        "updatedAt"
      )
      .join("users as u", "u.id", "a.authorId");
    articles.push(trending);

    if (userId) {
      let interests = await db("articles as a")
        .select(
          "u.id",
          "i.tagId",
          "t.name",
          "a.id as articleId",
          "a.title",
          "a.body"
        )
        .join("articleTags as at", "at.articleId", "a.id")
        .join("tags as t", "t.id", "at.tagId")
        .join("interests as i", "i.tagId", "t.id")
        .join("users as u", "u.id", "i.userId")
        .where("u.id", userId);
      // .groupBy("a.id");
      articles.push(interests);
    }
    return articles;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getArticles };
