const follows = require("../data/models/follow-model");
const { getInterests } = require("../data/models/user-model");
const { getUsers } = require("./users");
const interests = require("../data/models/interests-model");

async function addFollower(follow) {
  const newFollow = await follows.addNewFollower(follow);
  return newFollow;
}

async function getUsersToFollow(userId) {
    try {
    let usersToFollow;
    const myInterests =  await getInterests(userId);
    if (myInterests.length) {
      const removeNesting = [];
      myInterests.map(interest => removeNesting.push(interest.name));
      const users = await interests.findUsersByInterestName(removeNesting);
      usersToFollow = users.filter(user => user.id !== userId);
    } else {
        usersToFollow = await getUsers();
    }
    return usersToFollow;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addFollower,
  getUsersToFollow
};
