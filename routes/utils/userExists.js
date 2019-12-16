const db = require("../../data/dbConfig");

module.exports = async function userExists(req, res, next) {
  let { email } = req.body;

  const user = await db("users")
    .where({ email: email })
    .first();

  if (user)
    return res.status(400).json({
      error: "email already exists"
    });

  next();
};
