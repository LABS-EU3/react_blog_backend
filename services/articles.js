const AWS = require("aws-sdk");
const fs = require("fs");
const articles = require("../data/models/article-model");
const config = require("../config");
const sharp = require("sharp");

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION
});

async function findArticles(userId) {
  let feed;

  try {
    let trending = await articles.getTrendingArticles();
    let mainFeed = await articles.getGeneralFeed();

    if (userId) {
      let interests = await articles.getArticlesByUserInterests(userId);
      let following = await articles.getFollowingArticles(userId);

      if (!interests.length) {
        if (!following.length) {
          feed = { trending, mainFeed };
        } else {
          feed = { trending, mainFeed, following };
        }
      } else if (!following.length) {
        if (!interests.length) {
          feed = { trending, mainFeed };
        } else {
          feed = { trending, interests };
        }
      } else {
        feed = { trending, interests, following };
      }
    } else {
      feed = { trending, mainFeed };
    }
  } catch (error) {
    console.log(error);
  }

  if (!feed) {
    return { statusCode: 404, data: { message: "Articles not found." } };
  } else {
    return { statusCode: 200, data: feed };
  }
}

async function addNewArticle(article) {
  const response = await articles.addArticle(article);
  return response;
}

async function getArticles() {
  const response = await articles.getAllArticles();
  return response;
}

async function removeArticle(id) {
  const response = await articles.deleteArticle(id);
  return response;
}

async function likeArticle(articleId, userId) {
  const response = await articles.addArticleLike({ articleId, userId });
  return response;
}

async function getArticleLikeCount(id) {
  const response = await articles.getLikeCountByArticleId(id);
  return response;
}

async function addNewCover(cover) {
  const response = await articles.addCover(cover);
  return response;
}

async function addTag(tag, id) {
  const response = await articles.addTag({ name: tag, articleId: id });
  return response;
}

async function uploadFile(image) {
  try {
    const fileContent = fs.readFileSync(image.path);
    let compressedImage = sharp(fileContent)
      .jpeg({ quality: 50 })
      .png({ quality: 50 });

    const params = {
      Bucket: "getinsightly",
      Key: image.name, // File name you want to save as in S3
      Body: compressedImage
    };

    const url = new Promise(resolve => {
      s3.upload(params, function(err, data) {
        if (err) {
          throw err;
        }
        resolve(data.Location);
      });
    });

    return url;
  } catch (err) {
    console.log(err);
  }
}

async function getArticleInfo(data) {
  try {
    const article = await articles.getArticlesById(data.articleId);
    const tags = await articles.getArticleTags(article.id);
    const articleInfo = await getArticleLikeCount(article.id);
    
    
    let response = { ...article, tags, likeCount: articleInfo.count };
    if (data.userId) {
      // const hasLiked = articleInfo.find(item => item.userId === data.userId);
      // response = { ...response, hasLiked };
      let hasLiked = await articles.checkIfUserHasLiked(
        data.userId,
        article.id
      );
      response.hasLiked = hasLiked;
    }
    console.log(response);
    if (!article) {
      return {
        statusCode: 404,
        data: { message: `Cannot find article id of ${data.articleId}. ` }
      };
    } else {
      return { statusCode: 200, data: { response } };
    }
    
  } catch (err) {
    console.log(err);
  }
}

async function getArticleByAuthorId(authorId) {
  try {
    const response = await articles.findAuthorArticle(authorId);
    // const articles = { articles };

    if (!response) {
      return {
        statusCode: 404,
        data: { message: `Cannot find articles with authorid of ${authorId} ` }
      };
    } else {
      return { statusCode: 200, data: response };
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateArticle(articleId) {
  const updatedArticle = await articles.updateArticle(articleId);
  return updatedArticle;
}

async function checkIfArticleExistsToSave(articleId) {
  try {
    const article = await articles.getArticlesById(articleId);
    if (!article) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

async function getAllTags() {
  const response = await articles.findAllTags();
  return response;
}

module.exports = {
  likeArticle,
  findArticles,
  addNewArticle,
  removeArticle,
  addTag,
  uploadFile,
  getArticleInfo,
  getArticleLikeCount,
  addNewCover,
  getArticleByAuthorId,
  checkIfArticleExistsToSave,
  updateArticle,
  getArticles,
  getAllTags
};
