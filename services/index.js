const { authRouter } = require("./auths")


function routes(app) {
    app.use("/api/auth", authRouter);
}


module.exports = routes