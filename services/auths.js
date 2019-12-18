const bcrypt = require("bcryptjs");
const sendConfirmationEmail = require("../routes/utils/verificationEmail");
const { verifyUser, getBy, addNewUser } = require("../data/models/user-model");
const { generateToken } = require("../routes/utils/generateToken");

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