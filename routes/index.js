const auths = require('./auths');
const users = require("./users");
const { handleError } = require('./utils/errorHandler')

function routes(app) {
  app.use('/api/auth', auths);
  app.use("/api/users", users);
  app.use(handleError);
}

module.exports = routes;