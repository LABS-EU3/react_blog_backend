const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const sendConfirmationEmail = require("../routes/utils/verificationEmail");
const { verifyUser, getBy } = require("../data/models/user-model");

exports.registerUser = async (req, res) => {
  let { email, password, username } = req.body;

  try {
    const hash = bcrypt.hashSync(password, 10);
    const [id] = await db("users").insert(
      {
        email,
        username,
        password: hash
      },
      "id"
    );
    const [user] = await db("users").where({ id });
    sendConfirmationEmail(email, id);
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.verifyEmail = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await verifyUser(id);

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.loginUser = async (userData) => {
  const { username } = userData;

  try {
    const user = await getBy(username)
    return user;
  } catch (error){
    console.log(error);
  }
}