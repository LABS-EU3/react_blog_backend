const db = require("../../data/dbConfig");

exports.userExists = async (req, res, next) => {
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
