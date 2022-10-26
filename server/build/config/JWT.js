const { sign, verify } = require("jsonwebtoken");
const jwt = require('jsonwebtoken')

const createTokens = (user) => {
    const accessToken = sign(
        { email: user.email, id: user.id },
        "jwtsecret"
    );

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.body.Authorization.split(' ')[1];

    if (!accessToken)
        return res.status(400).json({ error: "User not Authenticated!" });

    try {
        const validToken = jwt.verify(token, "jwtsecret")
        if (validToken) {
            const userID = validToken.id
            console.log(validToken.id)
            res.status(200).json(validToken)
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

module.exports = { createTokens, validateToken };