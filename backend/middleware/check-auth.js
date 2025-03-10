const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN_HERE
        const decodedToken = jwt.verify(token, "secret_key_long_string");
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({message: "Auth failed"});
    }
};
