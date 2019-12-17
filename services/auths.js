const bcrypt = require("bcryptjs");
const sendConfirmationEmail = require("../routes/utils/verificationEmail");
const { verifyUser, addNewUser } = require("../data/models/user-model");

exports.registerUser = async user => {
  try {
    const { password } = user;
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;
    const response = await addNewUser(user);
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
