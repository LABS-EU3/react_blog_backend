const auths = require('./auths');
const articles = require('./articles');
const { handleError } = require('./utils/errorHandler')

function routes(app) {
  app.use('/api/auth', auths);
  app.use('/api/articles', articles);
  app.use(handleError);
}

module.exports = routes;