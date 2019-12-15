const auths = require('./auths');
const { handleError } = require('./utils/errorHandler')

function routes(app) {
  app.use('/api/auths', auths);

  app.use(handleError);
}

module.exports = routes;