const db = require("../dbConfig");

async function addNewUser(user) {
  try {
    const ids = await db("users").insert(user, "id");
    const id = ids[0];
    const response = await findUserById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function subscribeUser(data) {
  try {
    await db("subscription").insert(data);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function unsubscribeUser(data) {
  try {
    await db('subscription')
      .where({email: data})
      .update({status: 0});
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function getBasic(id) {
  try {
    const user = await db('users')
      .where({id: id})
      .first();
    return user;
  } catch(err) {
    console.log(err)
  }
}

async function editUser(userData, id) {
  try {
    const user = await db("users")
      .where({ id: id })
      .update(userData);
    return user;
  } catch (error) {
    console.log(error);
  }
}
async function findUsers() {
  try {
    const users = await db("users").select(
      "id",
      "fullname",
      "email",
      "avatarUrl"
    );
    return users;
  } catch (error) {
    console.log(error);
  }
}

async function findUserById(id) {
  try {
    const user = await db("users")
      .select("id", "email", "fullname", "jwt", "avatarUrl", "isVerified", "bio")
      .where({ id: id })
      .first();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getFollowersCount(userId) {
  try {
    const followers = await db("follows")
      .select("followerId")
      .where("followingId", userId);
    return followers;
  } catch (error) {
    console.log(error);
  }
}
async function getFollowingCount(userId) {
  try {
    const following = await db("follows")
      .select("followingId")
      .where("followerId", userId);
    return following;
  } catch (error) {
    console.log(error);
  }
}

async function getInterests(userId) {
  try {
    const interests = await db("interests")
      .select("name")
      .where({userId});
    return interests;
  } catch (error) {
    console.log(error);
  }
}

async function verifyUser(token, id) {
  try {
    await db("users")
      .where({ jwt: token })
      .update({ isVerified: 1 });
    const response = await findUserById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getBy(filter) {
  try {
    const userResponse = await db("users")
      .select("id", "fullname", "isVerified", "password", "email")
      .where(filter)
      .first();
    return userResponse;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addNewUser,
  editUser,
  verifyUser,
  findUserById,
  findUsers,
  getBy,
  subscribeUser,
  unsubscribeUser,
  getFollowingCount,
  getFollowersCount,
  getInterests,
  getBasic
};
