require('dotenv').config()
const User = require('../lib/user')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const controller = require('../controllers/index.controllers')
const PassportLocal = require('passport-local').Strategy;
const session = require('express-session')
const passport = require('passport');
const initPassportLocal = require('../controllers/passportController')
const auth = require('../validation/authValidation')
const { Users } = require("../models/Login");
const { createTokens, validateToken } = require("../config/JWT");


router.post("/register", (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
            .then(() => {
                res.json("USER REGISTERED");
            })
            .catch((err) => {
                if (err) {
                    res.status(400).json({ error: err });
                }
            });
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);

    if (!user) res.status(400).json({ error: "User Doesn't Exist" });

    const dbPassword = user.password;
    await bcrypt.compare(password, dbPassword).then((match) => {
        console.log(match)
        if (!match) {
            res
                .status(400)
                .json({ error: "Wrong Username and Password Combination!" });
        } else {
            const accessToken = createTokens(user);

            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true,
            });

            res.json("LOGGED IN");
            return accessToken;
        }
    });
});

router.get("/dashboard", validateToken, (req, res) => {
    res.json("dashboard");
});

module.exports = router