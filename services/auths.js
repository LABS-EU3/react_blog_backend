const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const sendConfirmationEmail = require("../routes/utils/verificationEmail");
const { verifyUser, getBy } = require("../data/models/user-model");
const { generateToken } = require("../routes/utils/generateToken");


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
  const { email, password, username } = userData;

  try {
    const user = await getBy({email});
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      return {
        username,
        email,
        token
      }
    }
   return null;

  } catch (error){
    console.log(error);
  }
}