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

async function addCover(cover) {
  try {
    const [id] = await db("covers").insert(cover, "id");
    const response = await findCoverById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function findCoverById(id) {
  try {
    const cover = await db("covers")
      .where({ id: id })
      .first();
    return cover;
  } catch (error) {
    console.log(error);
  }
}

async function findArticleCover(articleId) {
  try {
    const [{ url }] = await db("covers")
      .select("url")
      .where({ articleId: articleId });
    if (url) return url;
    else return;
  } catch (error) {
    console.log(error);
  }
}

async function findArticleById(id) {
  try {
    const article = await db("articles")
      .where({ id: id })
      .first();
    const articleCover = await findArticleCover(article.custom_id);
    return { ...article, coverImageUrl: articleCover ? articleCover : "" };
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
  getFollowingArticles,
  getArticlesByUserInterests,
  getGeneralFeed,
  getTrendingArticles,
  addArticle,
  addTag,
  getArticleTags,
  getArticlesById,
  addCover
};
