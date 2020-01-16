const db = require('../dbConfig');

async function addReactions(reaction) {
    try {
        const [id] = await db("reactions").insert(reaction, "id");
        const response = await findReactionsById(id);
        return response;
    } catch(error) {
        console.log(error);
    }
}

async function getReactions() {
    try {
        const reactions = await db("reactions as r")
            .select('userId', 'r.authorId', 'highlighted_text', 'emoji', 'r.title', 'articleId')
            .join('articles as a', 'a.id', 'r.articleId')
            .join('users as u', 'u.id', 'r.userId')
            .where('userId','=', 'u.id')    
        return reactions;
    } catch(error) {
        console.log(error)
    }
}

async function findReactionsById(id) {
    try {
        const reaction = await db("reactions")
            .where({ id: id })
            .first()
        return reaction;
    } catch(error) {
        console.log(error);
    }
}




module.exports ={
    addReactions,
    getReactions,
    findReactionsById
}
