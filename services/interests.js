const interest = require("../data/models/interests-model");

async function addInterests(interests) {
  const newInterest = await interest.addUserInterests(interests)
   return newInterest;
}

async function getInterests(id) {
  const interests = await interest.findInterests(id);

  if (!interests) {
    return { statusCode: 404, data: { message: "No interests found", interests } };
  } else {
    return { statusCode: 200, data: { interests } };
  }
}


module.exports = {
    addInterests,
    getInterests
}