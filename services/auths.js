const bcrypt = require("bcryptjs");
const sendConfirmationEmail = require("../routes/utils/verificationEmail");
const { verifyUser, addNewUser } = require("../data/models/user-model");

exports.registerUser = async newUser => {
  let { firstName, lastName, email, password, username } = newUser;
  const hash = bcrypt.hashSync(password, 10);

  const userBody = {
    firstName,
    lastName,
    username,
    email,
    password: hash
  };
  try {
    const response = await addNewUser(userBody);
    sendConfirmationEmail(response.email, response.id);
    return response;
  } catch (error) {
    return error.message;
  }
};

exports.verifyEmail = async id => {
  try {
    const updatedUser = await verifyUser(id);
    return updatedUser;
  } catch (error) {
    return error.message;
  }
};
