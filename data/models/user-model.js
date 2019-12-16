const db = require("../dbConfig");

async function addNewUser(user) {
  const ids = await db("users").insert(user, "id");
  const id = ids[0];
  const response = await db("users")
    .select("id", "email", "username")
    .where({ id: id })
    .first();
  return response;
}

async function verifyUser(id) {
  await db("users")
    .where({ id: id })
    .update({ isVerified: 1 });
  const user = await db("users")
    .where({ id: id })
    .first();
  return user;
}

module.exports = { addNewUser, verifyUser };
