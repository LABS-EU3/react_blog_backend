const db = require("../dbConfig");

async function addUserInterests(interests) {
  try {
    const [id] = await db("interests").insert(interests, "id");
    const response = await findUsersByInterest(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function findUsersByInterest(id) {
  try {
    const response = await db("interests")
      .where({ id: id })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function findInterestsByUserId(userId) {
  try {
    const interests = await db("interests")
      .select("name")
      .where({ userId });
    return interests;
  } catch (error) {
    console.log(error);
  }
}

async function findInterests() {
  try {
    const interests = await db("interests").select("id", "name", "userId");
    return interests;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUserInterests(userId, interests) {
  try {
    const response = await db("interests")
      .whereIn("name", interests)
      .andWhere({ userId })
      .del();
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  findInterests,
  addUserInterests,
  findUsersByInterest,
  deleteUserInterests,
  findInterestsByUserId
};
