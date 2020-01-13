const db = require("../dbConfig");

const mockFollowing = [
  {
    id: 1,
    title: "Why I love Lambda School",
    body:
      '{"{\\"type\\":\\"paragraph\\",\\"data\\":{\\"text\\":\\"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.\\"}}"}',
    authorId: 29,
    author: "Megan Ennis",
    createdAt: "2019-12-14",
    tags: [{ id: 2, name: "Tech" }]
  },
  {
    id: 2,
    title: "Here's What You Missed at CES 2020",
    body:
      '{"{\\"type\\":\\"paragraph\\",\\"data\\":{\\"text\\":\\"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.\\"}}"}',
    authorId: 29,
    author: "Johnson Ogwuru",
    createdAt: "2019-12-16",
    tags: [
      { id: 1, name: "Business" },
      { id: 2, name: "Tech" }
    ]
  },
  {
    id: 3,
    title: "Top Tech Trends for 2020",
    body:
      '{"{\\"type\\":\\"paragraph\\",\\"data\\":{\\"text\\":\\"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.\\"}}"}',
    authorId: 29,
    author: "David Kuseh",
    createdAt: "2018-12-01",
    tags: [
      { id: 2, name: "Tech" },
      { id: 3, name: "Health & Fitness" }
    ]
  }
];

async function getTrendingArticles() {
  try {
    let response = await db("articles as a")
      .select(
        "a.id",
        "title",
        "body",
        "authorId",
        "u.fullname as author",
        "createdAt",
        "updatedAt"
      )
      .join("users as u", "u.id", "a.authorId")
      .limit(5);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getArticlesByUserInterests(id) {
  try {
    let response = await db("articles as a")
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
      .where("u.id", id);
      return response;
  } catch (error) {
    console.log(error);
  }
}

async function getGeneralFeed() {
  try {
    let response = await db("articles as a")
      .select(
        "a.id",
        "title",
        "body",
        "authorId",
        "u.fullname as author",
        "createdAt",
        "updatedAt"
      )
      .join("users as u", "u.id", "a.authorId");
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getArticles(userId) {
  let articles;
  try {
    let trending = await getTrendingArticles();
    let generalFeed = await getGeneralFeed();
    if (userId) {
      let interests = await getArticlesByUserInterests(userId);
      let following = mockFollowing;
      if (!interests.length) {
        articles = {
          trending: trending,
          mainFeed: generalFeed,
          following: following
        };
      } else {
        articles = {
          trending: trending,
          interests: interests,
          following: following
        };
      }
    } else {
      articles = { trending: trending, mainFeed: generalFeed };
    }
    return articles;
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

module.exports = { getArticles, addArticle, addTag };
