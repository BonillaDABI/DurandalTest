const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign(
        { email: user.email, id: user.id },
        "jwtsecret"
    );

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookie["access-token"];

    if (!accessToken)
        return res.status(400).json({ error: "User not Authenticated!" });

    try {
        const validToken = verify(accessToken, "jwtsecret");
        if (validToken) {
            console.log(validToken.id)
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

module.exports = { createTokens, validateToken };