const db = require("../dbConfig");

async function addNewFollower(follow) {
    try {
        const [id] = await db("follows").insert(follow, "id");
        const response = await findUserByFollow(id)
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