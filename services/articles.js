const AWS = require('aws-sdk');
const fs = require('fs');
const articles = require("../data/models/article-model");
const config = require('../config');

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION
});

async function findArticles() {
  const allArticles = await articles.getArticles();

  if (!allArticles) {
    return { statusCode: 404, data: { message: "Articles not found." } };
  } else {
    return { statusCode: 200, data: { data: allArticles } };
  }
}

async function addNewArticle(article) {
  const response = await articles.addArticle(article);
  return response;
}

async function addTag(tag, id) {
  const response = await articles.addTag({ name: tag, articleId: id });
  return response;
}

async function uploadFile(image) {
  try {
    const fileContent = fs.readFileSync(image.path);

    const params = {
      Bucket: 'getinsightly',
      Key: image.name, // File name you want to save as in S3
      Body: fileContent
    };

    
    const url = new Promise((resolve) => {
      s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        resolve(data.Location)
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    })

    return url
    
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  findArticles,
  addNewArticle,
  addTag,
  uploadFile
};
