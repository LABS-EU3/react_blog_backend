const users = require("../data/models/user-model");

async function getUsers() {
  const allusers = await users.findUsers();

  if (!allusers) {
    return { statusCode: 404, data: { message: "Users not found." } };
  } else {
    return { statusCode: 200, data: { data: allusers } };
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



module.exports = {
  getUserInfo,
  getUsers
};
