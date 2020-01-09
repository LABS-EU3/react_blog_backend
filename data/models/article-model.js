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

// const insert = db('organizations')
//       .insert(organization)
//       .toString();

//     const update = db('organizations')
//       .update(organization, '*')
//       .whereRaw('organizations.slack_org_id = ?', [organization.slack_org_id]);

//     const query = util.format(
//       '%s ON CONFLICT (slack_org_id) DO UPDATE SET %s',
//       insert.toString(),
//       update.toString().replace(/^update\s.*\sset\s/i, '')
//     );

//     let savedOrg;
//     await db.raw(query).then(res => {
//       savedOrg = res.rows[0];
//     });
//     return savedOrg;

async function addArticle(article) {
  try {
    // const insert = db('articles')
    //   .insert(article)
    //   .toString();
    
    // const update = db('articles')
    //   .update(article, '*')
    //   .whereRaw('article')


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
async function getArticlesById(id) {
    try {
      const articles = await db("articles")
        .select("id", "title", "body", "authorId", "createdAt","updatedAt")
        .where({ id: id })
        .leftJoin("users as u", "u.id", "=", "a.authorId")
        .first();
      return articles;
    } catch (error) {
      console.log(error);
    }
  }


module.exports = { getArticles, getArticlesById };
