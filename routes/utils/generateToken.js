const jwt = require("jsonwebtoken");

module.exports = {
    generateToken
}

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    }
    const options = {
      expiresIn: '1d',
    }
    const result = jwt.sign(
      payload,
      process.env.SECRET || 'A SECRET CODE HERE',
      options
    )
  
    return result;
}