const bcrypt = require("bcryptjs");
const sendConfirmationEmail = require("../routes/utils/verificationEmail");
const { verifyUser, getBy, addNewUser } = require("../data/models/user-model");
const { generateToken, generateVerificationToken } = require("../routes/utils/generateToken");

exports.registerUser = async user => {
  try {
    const { password } = user;
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;
    user.jwt = generateVerificationToken(15, '12345abcde')
    const response = await addNewUser(user);
    const token = generateToken(response);
    sendConfirmationEmail(response.email, response.jwt);
    return {response, token};
  } catch (error) {
    return error.message;
  }
};

exports.verifyEmail = async (token, id) => {
  try {
    const updatedUser = await verifyUser(token, id);
    return updatedUser;
  } catch (error) {
    return error.message;
  }
};

exports.loginUser = async (userData) => {
  const { email, password } = userData;

  try {
    const user = await getBy({email});
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      return {
        email,
        token
      }
    }
   return null;

  } catch (error){
    console.log(error);
  }
}