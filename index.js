require("dotenv").config();
const server = require("./app");

const PORT = process.env.PORT || 3300;
console.log(process.env.DATABASE_URL);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
