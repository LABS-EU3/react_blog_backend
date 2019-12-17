const db = require("../dbConfig");

async function addNewUser(user) {
  try {
    const ids = await db("users").insert(user, "id");
    const id = ids[0];
    return findUserById(id);
  } catch (error) {
    console.log(error);
  }
}

async function findUserById(id) {
  try {
    const user = await db("users")
      .select("id", "email", "username")
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
    return findUserById(id);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addNewUser, verifyUser };
