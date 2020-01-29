const follows = require("../data/models/follow-model");

async function addFollower(follow) {
    const newFollow = await follows.addNewFollower(follow)
    return newFollow;
}

module.exports = {
    addFollower
}