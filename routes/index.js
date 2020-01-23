const auths = require('./auths');
const users = require("./users");
const articles = require('./articles');
const interests = require('./interests');
const { handleError } = require('./utils/errorHandler')

function routes(app) {
  app.use('/api/auth', auths);
  app.use("/api/users", users);

  app.use('/api/articles', articles);
  app.use('/api/interests', interests);


  app.use(handleError);

  app.get('/', (req, res) => {
    res.status(200).json({
        api: "running"
    })
  });
}

module.exports = routes;