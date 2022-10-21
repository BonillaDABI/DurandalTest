const connection = require("../config/database");
const fs = require('fs')
const bcrypt = require('bcrypt')
// const userUpload = require('../lib/users')
const saltRounds = 10;
const { models } = require('../models/index')
const jwt = require('jsonwebtoken')
const storage = require('../lib/handyStorage')
const User = require('../lib/user')
const { Users } = require("../models/Login");
const { createTokens, validateToken } = require("../config/JWT");
const { verify } = require("jsonwebtoken");
const jwtDecode = require('jwt-decode')

const authController = {}

authController.listAll = async (req, res) => {
    try {
        await connection.query("SELECT * FROM users");
        res.status(200).send('Todos los usuarios.')
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
}



authController.update = async (req, res) => {
    const token = req.body.Authorization;
    console.log(token)
    // const token = req.body.token.split(' ')[0];
    // console.log(token)
    // // const payload = jwtDecode(token)
    // // console.log(payload)

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id

    console.log(userID)

    // User.jwtVerify(token, "jwtsecret").then(data => {
    //     if (!data.id) return res.error(Codes.invalidLoginToken);
    // })
    const date = new Date()
    const { name } = req.body;
    const password = await bcrypt.hash(req.body.password, 10)
    const { first_surname, second_surname, email } = req.body;

    try {
        await connection.query(
            "UPDATE users SET ? WHERE name = ?",
            [{
                first_surname,
                second_surname,
                email,
                password,
                updated_by: data.id,
                updated_at: date
            }, name],
        )
        res.status(200).send('Usuario actualizado.')
    } catch (error) {
        res.status(400).send('Combinacion de correo y contrasena equivocada.')
    }
}

authController.register = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10)
    const date = new Date()

    const { name, first_surname, second_surname, email } = req.body;

    const user = await User.getUserByEmail(email);

    if (!user) {
        connection.query("INSERT INTO `users` SET ?", [{
            id: 03,
            name,
            first_surname,
            second_surname,
            email,
            password,
            is_active: 01,
            created_by: 01,
            created_at: date,
            updated_at: date
        }]
        )
        res.status(200).send('Usuario creado.')
    } else {
        res.status(400).send('Combinacion de correo y contrasena equivocada.')
    }
}

authController.showLogin = (req, res) => {

}

authController.login = async (req, res) => {
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
            // storage.setState({
            //     token: jwt.sign({ user: req.body.email }, "supersecretword", { expiresIn: "2h" }),
            //     user: user.dataValues
            // })

            const accessToken = createTokens(user);
            // const accessToken = jwt.sign({ email: user.email, id: user.id }, "+hvS23x&9^tsMQzyA9UWxu!H_ApezBAVLcAWEPBA*ecAweS", { expiresIn: '12h' })

            // res.cookie("access-token", accessToken, {
            //     maxAge: 60 * 60 * 24 * 30 * 1000,
            //     httpOnly: true,
            // });
            res.json(accessToken)
        }
    });
}

authController.logout = (req, res) => {

}

authController.dashboard = (req, res) => {

}

// app.post('/login', (req, res) => {
//     var { email, password } = req.body;
//     if (!email || email.length < 5 || !password) return res.error(Codes.missingInfo);

//     User.login(email, password).then(user => {
//         if (!user) return res.error(Codes.invalidCredentials);
//         Util.jwtSign({ u: user.admin_id }, Constants.keys.USER_JWT).then(token => {
//             return res.success({ token, user });
//         }).catch(err => {
//             return res.error(Codes.markers.login(2));
//         });
//     }).catch(err => {
//         return res.error(Codes.markers.login(1));
//     });
// });

// app.all('*', (req, res, next) => {
//     var token = req.headers.token || req.body.token;
//     if (!token || token.length < 8) return res.error(Codes.invalidLoginToken);

//     Util.jwtVerify(token, Constants.keys.USER_JWT).then(data => {
//         if (!data.u || Number.isNaN(data.u)) return res.error(Codes.invalidLoginToken);
//         User.withPermissions(data.u, false).then(user => {
//             if (!user || user.deleted) return res.error(Codes.invalidLoginToken);
//             req.user = user;
//             req.admin_id = user.admin_id;
//             return next();
//         }).catch(err => {
//             return res.error(Codes.markers.verifyToken(2));
//         });
//     }).catch(err => {
//         return res.error(Codes.markers.verifyToken(1));
//     });
// })
module.exports = authController;