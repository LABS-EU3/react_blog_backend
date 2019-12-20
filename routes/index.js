const auths = require('./auths');
const { handleError } = require('./utils/errorHandler')

function routes(app) {
  app.use('/api/auth', auths);
  app.use(handleError);
  app.get('/', (req, res) => {
    res.status(200).json({
        api: "running"
    })
  });
}

module.exports = routes;