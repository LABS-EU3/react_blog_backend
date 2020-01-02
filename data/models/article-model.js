const db = require("../dbConfig");

async function getArticles() {
    try {
        const response = await db("articles as a")
        .select("a.id","title","body","authorId","createdAt","updatedAt")
        .where("a.authorId","=", "u.id")
        .leftJoin("users as u", "u.id", "=", "a.authorId")
        return response;
    }
    catch (error) {
        console.log(error)
    }
}

async function getArticlesById(id) {
    try {
      const user = await db("articles")
        .select("id", "title", "body", "authorId")
        .where({ id: id })
        .first();
      return user;
    } catch (error) {
      console.log(error);
    }
  }


module.exports = { getArticles, getArticlesById };