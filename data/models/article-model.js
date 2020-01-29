const db = require("../dbConfig");

async function addArticleLike(articleLike) {
  try {
    const ids = await db("articleLikes as al").insert(articleLike, "id");
    const id = ids[0];
    return id;
  } catch (error) {
    console.log(error);
  }
}

async function getIfUserLikesArticle(userId, articleId) {
  try {
    let response = await db("articleLikes")
      .select(
        "userId",
        "articleId"
      )
      .where("userId", userId)
      .andWhere("articleId", articleId)
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getLikeCountByArticleId(id) {
  try {
    let response = await db("articleLikes")
      .count()
      .where("articleId", id)
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getFollowingArticles(id) {
  try {
    let response = [];
    let articles = await db("follows as f")
      .select(
        "a.id",
        "a.custom_id",
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
        "a.custom_id",
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
        "a.custom_id",
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
        "a.custom_id",
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

async function deleteArticle(id) {
  try {
    const response = await db("articles").where({id}).del();
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

// async function findArticleCover(articleId) {
//   try {
//     const [{ url }] = await db("covers").where({ articleId: articleId });
//     return url;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function findArticleById(id) {
  try {
    const article = await db("articles")
      .where({ id: id })
      .first();
    return {
      ...article,
      coverImageUrl: article.coverImageUrl.length ? article.coverImageUrl : ""
    };
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
        "articles.custom_id",
        "articles.coverImageUrl",
        "title",
        "body",
        "authorId",
        "createdAt",
        "updatedAt"
      )
      .where({ custom_id: id })
      .first();
    const [{ fullname }] = await db("users")
      .select("fullname")
      .where({ id: article.authorId });

    return { ...article, authorName: fullname };
  } catch (error) {
    console.log(error);
  }
}

async function findAllTags() {
  try {
    const tags = await db("tags")
      .select("name", "id", "articleId")
      .distinct();
    return tags;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addArticleLike,
  getIfUserLikesArticle,
  getLikeCountByArticleId,
  getFollowingArticles,
  getArticlesByUserInterests,
  getGeneralFeed,
  getTrendingArticles,
  addArticle,
  deleteArticle,
  addTag,
  getArticleTags,
  getArticlesById,
  addCover,
  findAllTags
};
