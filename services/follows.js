const follows = require("../data/models/follow-model");
const { getInterests } = require("../data/models/user-model");
const { getUsers } = require("./users");
const interests = require("../data/models/interests-model");
const _ = require("lodash");
const { predicateAndModifier } = require("../routes/utils/removeDupeValues");

async function addFollower(follow) {
  const newFollow = await follows.addNewFollower(follow);
  return newFollow;
}

async function getUsersToFollow(userId) {
  try {
    const myInterests = await getInterests(userId);
    if (myInterests.length) {
      //The response from the getInterests service is nested. 
      //Below I remove nesting and return an array of just interest names. (This is the format the db model expects).
      const interestNames = myInterests.map(interest =>interest.name);
      const users = await interests.findUsersByInterestNames(interestNames);
      //Make sure the current user is not returned in response
      const usersToFollow = users.filter(user => user.id !== userId);
      //Plug in util function to remove duplicate users in response 
      const response = _.uniqWith(usersToFollow, predicateAndModifier);
      return response;
    } else {
      const usersToFollow = await getUsers();
      const response = usersToFollow.filter(user => user.id !== userId);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addFollower,
  getUsersToFollow
};
