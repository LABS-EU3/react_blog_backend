const db = require("../dbConfig");

async function getFollowingArticles(id) {
  try {
    let response = [];
    let articles = await db("follows as f")
      .select(
          "a.id",
          "a.title",
          "a.body",
          "f.followingId as authorId",
          "au.fullname as author",
          "a.createdAt",
          "a.updatedAt",
          "a.coverImageUrl"
      )
      .join("users as u", "u.id", "f.followerId")
      .join("articles as a", "a.authorId", "f.followingId")
      .join("users as au", "au.id", "a.authorId")
      .where("f.followerId", id)
      .andWhere("a.isPublished", "true");
      
      for (let i = 0; i < articles.length; i++) {
        await getTagsByArticleId(articles[i].id).then(res => {
          response.push({ ...articles[i], tags: res });
        });
      }

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getTrendingArticles() {
  try {
    let response = [];

    let articles = await db("articles as a")
      .select(
        "a.id",
        "title",
        "body",
        "authorId",
        "u.fullname as author",
        "createdAt",
        "updatedAt",
        "a.coverImageUrl"
      )
      .join("users as u", "u.id", "a.authorId")
      .where("a.isPublished", "true")
      .limit(5);

    for (let i = 0; i < articles.length; i++) {
      await getTagsByArticleId(articles[i].id).then(res => {
        response.push({ ...articles[i], tags: res });
      });
    }

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getArticlesByUserInterests(id) {
  try {
    let response = [];

    let articles = await db("articles as a")
      .select(
        "a.id",
        "a.title",
        "a.body",
        "au.id as authorId",
        "au.fullname as author",
        "a.createdAt",
        "a.coverImageUrl"
      )
      .join("tags as t", "t.articleId", "a.id")
      .join("interests as i", "i.name", "t.name")
      .join("users as u", "u.id", "i.userId")
      .join("users as au", "au.id", "a.authorId")
      .where("i.userId", id)
      .andWhere("a.isPublished", "true")
      .distinct();

      for (let i = 0; i < articles.length; i++) {
        await getTagsByArticleId(articles[i].id).then(res => {
          response.push({ ...articles[i], tags: res });
        });
      }

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getGeneralFeed() {
  try {
      let response = [];

    let articles = await db("articles as a")
      .select(
        "a.id",
        "title",
        "body",
        "authorId",
        "u.fullname as author",
        "createdAt",
        "updatedAt",
        "a.coverImageUrl"
      )
      .join("users as u", "u.id", "a.authorId")
      .where("a.isPublished", "true");
      
      for (let i = 0; i < articles.length; i++) {
        await getTagsByArticleId(articles[i].id).then(res => {
          response.push({ ...articles[i], tags: res });
        });
      }

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
      let following = await getFollowingArticles(userId);
      if (!interests.length) {
        if (!following.length) {
          articles = {
            trending: trending,
            mainFeed: generalFeed
          };
        } else {
          articles = {
            trending: trending,
            mainFeed: generalFeed,
            following: following
          };
        }
      } else if (!following.length) {
        if (!interests.length) {
          articles = {
            trending: trending,
            mainFeed: generalFeed
          };
        } else {
          articles = {
            trending: trending,
            interests: interests
          };
        }
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

async function getTagsByArticleId(id) {
  try {
    let response = await db("articles as a")
      .select("t.id", "t.name")
      .join("tags as t", "a.id", "t.articleId")
      .where("a.id", id);
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

module.exports = {
  getArticles,
  getFollowingArticles,
  getArticlesByUserInterests,
  getGeneralFeed,
  getTrendingArticles,
  getTagsByArticleId,
  addArticle,
  addTag
};
