const db = require("../dbConfig");

async function add(user) {
  const ids = await db("users").insert(user, "id");
  const id = ids[0];
  const response = await db("users")
    .select("id", "email", "username")
    .where({ id: id })
    .first();
  return response;
}

module.exports = add;
