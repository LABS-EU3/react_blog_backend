const users = require("../data/models/user-model");


async function addSubscription(data) {
  const response = await users.subscribeUser(data);
  if (response) {
    return { statusCode: 201, data: { message: 'Subscription successful' } };
  } else {
    return { statusCode: 400, data: { message: 'Something went wrong on our end, try again in a sec, while we fix it' } };
  }
}

async function removeSubscription(data) {
  const response = await users.subscribeUser(data.email);
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

async function getUserInfo(userId) {
  const user = await users.findUserById(userId);

  if (!user) {
    return { statusCode: 404, data: { message: "Cannot find user." } };
  } else {
    return { statusCode: 200, data: { user } };
  }
}

async function editUserInfo(userInfo, userId) {
  const user = await users.editUser(userInfo, userId);

  if(!user) {
    return { statusCode: 404, data: { message: "User does not exist" } };
  } else {
    return { statusCode: 200, data: { user } };
  }
}

module.exports = {
  getUserInfo,
  getUsers,
  editUserInfo,
  addSubscription,
  removeSubscription
};
