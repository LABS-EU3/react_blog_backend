const db = require('../../data/dbConfig');
const jwt = require('jsonwebtoken');

exports.checkIfUserIsLoggedIn = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({
            error: "Missing token from `Authorization` header!"
        });
    }
    try {
        const [user] = await db("users").where({ jwt: token });
        if (!user && token) {
            return res.status(401).json({
                error: "Invalid token, please try again after re-logging in."
            });
        } else {
            jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
                if (error) {
                    switch (error.name) {
                        case "TokenExpiredError":
                        case "JsonWebTokenError":
                            return res.status(401).json({ ...error });
                        default:
                            return res.status(401).json({
                                error: "Could not verify JWT token. Re-login and try again."
                            });
                    }
                } else {
                    //The token is a good token!
                    req.decodedJwt = decodedToken;
                    next();
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}