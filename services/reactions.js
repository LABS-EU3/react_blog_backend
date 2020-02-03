const reactions = require('../data/models/reactions-model.js');

async function addNewReaction(reaction) {
    const response = await reactions.addReactions(reaction);
    return response;
}

async function getReactorReactions(data) {
    try {
        const response = await reactions.findReactionsByReactorId(data);
        return response;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addNewReaction,
    getReactorReactions
}