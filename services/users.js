const users = require("../data/models/user-model");

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

module.exports = {
  getUserInfo,
  getUsers
};
