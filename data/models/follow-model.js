const db = require("../dbConfig");

async function addNewFollower(follow) {
    try {
        const response = await db("follows").insert(follow)
        return response;
    } catch (error) {
        console.log(error)
    }
}

async function findUserByFollow(id) {
    try {
        const response = await db("follows")
        .where({id: id})
        .first()
        return response;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { addNewFollower, findUserByFollow }