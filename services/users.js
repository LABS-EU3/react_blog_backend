const users = require("../data/models/user-model");
const bcrypt = require("bcryptjs");
const { generateToken, generateVerificationToken } = require("../routes/utils/generateToken");

async function getUsers() {
  const allUsers = await users.findUsers();

  if (!allUsers) {
    return { statusCode: 404, data: { message: "Users not found." } };
  } else {
    return { statusCode: 200, data: { data: allUsers } };
  }
}

async function getUserInfo(userId) {
  const user = await users.findUserById(userId);

  if (!user) {
    return { statusCode: 404, data: { message: "Cannot find user." } };
  } else {
    return { statusCode: 200, data: { user } };
  }
}

async function editUserInfo(userInfo, userId) {

  try {
    const user = await users.editUser(userInfo, userId);

    if(!user) {
      return { statusCode: 404, data: { message: "User does not exist" } };
    } else {

      const { password, fullname, email } = userInfo;
      if (password) {
        const hash = bcrypt.hashSync(password, 10);
        userInfo.password = hash;
        console.log(userInfo.password);
        console.log(password);

        return hash;
      } else if(fullname || email) {
        console.log(fullname, email)
          return { fullname, email }
      }
      return { 
        statusCode: 200, 
        data: { 
          user 
        } 
      };
    }
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getUserInfo,
  getUsers,
  editUserInfo
};
