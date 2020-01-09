const db = require("../dbConfig");

const following = [
  {
    id: 1,
    title: "Why I love Lambda School",
    body:
      '{"{\\"type\\":\\"paragraph\\",\\"data\\":{\\"text\\":\\"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.\\"}}"}',
    authorId: 29,
    author: "Megan Ennis",
    createdAt: "2019-12-14"
  },
  {
    id: 2,
    title: "Here's What You Missed at CES 2020",
    body:
      '{"{\\"type\\":\\"paragraph\\",\\"data\\":{\\"text\\":\\"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.\\"}}"}',
    authorId: 29,
    author: "Johnson Ogwuru",
    createdAt: "2019-12-16"
  },
  {
    id: 3,
    title: "Top Tech Trends for 2020",
    body:
      '{"{\\"type\\":\\"paragraph\\",\\"data\\":{\\"text\\":\\"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.\\"}}"}',
    authorId: 29,
    author: "David Kuseh",
    createdAt: "2018-12-01"
  }
];

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
      .join("users as u", "u.id", "a.authorId")
      .limit(5);
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
    } else {
      let generalFeed = await db("articles as a")
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
      articles.push(generalFeed);
    }
    return articles;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getArticles };
