const db = require("../dbConfig");

async function addNewUser(user) {
  try {
    const ids = await db("users").insert(user, "id");
    const id = ids[0];
    const response = await findUserById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function findUsers() {
  try {
    const users = await db("users").select("id", "fullname", "email", "avatarUrl");
    return users;
  } catch (error) {
    console.log(error);
  }
}

async function findUserById(id) {
  try {
    const user = await db("users")
      .select("id", "email", "fullname", "avatarUrl")
      .where({ id: id })
      .first();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function verifyUser(id) {
  try {
    await db("users")
      .where({ id: id })
      .update({ isVerified: 1 });
    const response = await findUserById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}


async function getBy(filter) {
  try {
   const userResponse = await db("users")
    .select("id", "fullname", "isVerified", "password", "email")
    .where(filter)
    .first()
    return userResponse;
  } catch (err) {
    console.log(err)
  }
}
module.exports = { addNewUser, verifyUser, findUserById, findUsers, getBy };