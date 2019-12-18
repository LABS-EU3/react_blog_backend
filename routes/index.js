const auths = require('./auths');
const { handleError } = require('./utils/errorHandler')

function routes(app) {
  app.use('/api/auth', auths);
  app.use(handleError);
}

module.exports = routes;