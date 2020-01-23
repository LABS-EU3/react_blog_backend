module.exports = {
  JWT_SECRET: process.env.SECRET,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  PORT: process.env.PORT || 3300,
  CLIENT_URL: process.env.CLIENT_URL
}