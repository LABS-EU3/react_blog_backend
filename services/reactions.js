const reactions = require('../data/models/reactions-model.js');

async function addNewReaction(reaction) {
    const response = await reactions.addReactions(reaction);
    return response;
}

module.exports = {
    addNewReaction
}