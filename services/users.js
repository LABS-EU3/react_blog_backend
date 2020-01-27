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
  const followers = await users.getFollowersCount(userId);
  const following = await users.getFollowingCount(userId);
  const interests = await users.getInterests(userId);
  if (!user) {
    return { statusCode: 404, data: { message: "Cannot find user." } };
  } else {
    return {
      statusCode: 200,
      data: {
        ...user,
        followers: followers.count || 0,
        following: following.count || 0,
        interests
      }
    };
  }
}

async function findFollowerCount(id) {
  const response = await users.getFollowersCount(id);
  return response;
}

async function findFollowingCount(id) {
  const response = await users.getFollowingCount(id);
  return response;
}

async function editUserInfo(userInfo, userId) {

  try {
    const user = await users.editUser(userInfo, userId);

    if(!user) {
      return { statusCode: 404, data: { message: "User does not exist" } };
    } else {      
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

module.exports = {
  getUserInfo,
  getUsers,
  editUserInfo,
  findFollowerCount,
  findFollowingCount
};
