require("dotenv").config();
const server = require("./app");
const config = require('./config');

const PORT = config.PORT

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
