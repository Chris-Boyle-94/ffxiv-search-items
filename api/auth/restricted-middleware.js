const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../data/secrets");

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return next({ status: 401, message: "missing token" });
    }

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return next({
                status: 401,
                message: `bad token: ${err.message}`,
            });
        }

        req.authData = decodedToken;
        return next();
    });
};
