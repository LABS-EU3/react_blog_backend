const db = require("../dbConfig");

async function addUserInterests(interests) {
  try {
    const [id]= await db("interests").insert(interests, "id");
    const response = await findUsersByInterest(id)
    return response;
  } catch (error) {
    console.log(error)
  }
}

async function findUsersByInterest(id) {
  try {
    const response = await db("interests")
      .where({id: id})
      .first()
    return response;
  } catch (error) {
    console.log(error)
  }
}

async function findUsersByInterestName(interests) {
  try {
    const userIds = await db("interests as i")
      .select("u.id", "u.fullname", "u.bio", "u.avatarUrl")
      .join("users as u", "u.id", "i.userId")
      .whereIn("i.name", interests)
      .distinct();
    return userIds;
  } catch (error) {
    console.log(error);
  }
}

async function findInterests() {
  try {
    const interests = await db("interests")
    .select("id","name","userId")
    return interests;
  } catch (error) {
    console.log(error)
  }
}

module.exports = { findInterests, addUserInterests, findUsersByInterest, findUsersByInterestName };
