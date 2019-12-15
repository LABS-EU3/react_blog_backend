const server = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
