const users = require("../data/models/user-model");
const _ = require("lodash");

async function addSubscription(data) {
  const response = await users.subscribeUser(data);
  if (response) {
    return { statusCode: 201, data: { message: 'Subscription successful' } };
  } else {
    return { statusCode: 400, data: { message: 'Something went wrong on our end, try again in a sec, while we fix it' } };
  }
}

async function removeSubscription(data) {
  const response = await users.unsubscribeUser(data);
  if (response) {
    return { statusCode: 200, data: { message: 'Unsubscribed successful' } };
  } else {
    return { statusCode: 400, data: { message: 'Something went wrong on our end, try again in a sec, while we fix it' } };
  }
}

async function getUsers() {
  const allUsers = await users.findUsers();

  if (!allUsers) {
    return { statusCode: 404, data: { message: "Users not found." } };
  } else {
    return { statusCode: 200, data: { data: allUsers } };
  }
}

async function getBasic(id) {
  try {
    const user = await users.getBasic(id);
    const info = _.omit(user, ["password"])
    return info;
  } catch(err) {
    console.log(err);
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
        followers: followers.map(follower => follower.followerId),
        following: following.map(following => following.followingId),
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
}

module.exports = {
  getUserInfo,
  getUsers,
  editUserInfo,
  addSubscription,
  removeSubscription,
  findFollowerCount,
  findFollowingCount,
  getBasic
};
