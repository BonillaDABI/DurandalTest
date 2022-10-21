const connection = require('../config/database')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const passport = require('passport')
const PassportLocal = require('passport-local')
// const initializePassport = require('../config/passport')
const loginService = require('../lib/user')
// const { login } = require('./users.controller')

// initializePassport(passport, email => {
//     users.find()
// })
// const session = require("express-session");
// app.use(
//     session({
//         key: "userId",
//         secret: "secret",
//         resave: false,
//         saveUninitialized: false,
//     })
// );

const controller = {}


//Controlador para registrar usuarios
controller.register = async (req, res) => {

    const password = await bcrypt.hash(req.body.password, 10)

    const { name, first_surname, second_surname, email } = req.body;

    const user = await connection.query('Select * from users where email = ?', [email]);

    if (!user) {
        connection.query("INSERT INTO `users` SET ?", [{
            name: name,
            first_surname,
            second_surname,
            email,
            password,
            is_active: 01,
            created_by: ,
            created_at: Date.now()
        }]
        )
    } else {
        res.status(400).send('Combinacion de correo y contrasena equivocada.')
    }
};

//Controlador para ingresar a la cuenta
controller.login = async (req, res) => {

    // login.use(passport.initialize)
    // login.use(passport.session())


    const { email, password } = req.body;

    // passport.use(new PassportLocal(function (emailUser, passwordUser, done) {
    //     if (emailUser === email && passwordUser === password) {

    //     }
    // }))

    connection.query(
        "SELECT * FROM `users` WHERE `email` = ?",
        [email],
        async (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (result.length > 0) {
                    console.log(result[0].password)
                    console.log(password)
                    const valid = await bcrypt.compare(password, result[0].password)
                } else {
                    res.status(400).send('Usuario no existe')
                    return console.log('Usuario no existe')
                }
            }
        }
    )
};

//Controlador para update
controller.update = async (req, res) => {

    const { name } = req.body;
    const { first_surname, second_surname, email, password } = req.body;

    await connection.query(
        "UPDATE users SET first_surname = IFNULL(?, first_surname), second_surname = IFNULL(?, second_surname), email = IFNULL(?, email), password = IFNULL(?, password) WHERE name = ?;",
        [first_surname, second_surname, email, password, name],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (result.length > 0) {
                    res.status(200).send(result[0])
                    console.log(result)
                }
            }
        }
    );
};

controller.listAll = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

controller.getPageLogin = (req, res) => {
    // If the user is loggedin
    if (req.session.loggedin) {
        // Output username
        res.send('Welcome back, ' + req.session.username + '!');
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
    res.end();
};

controller.handleLogin = async (req, res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/login");
    }

    try {
        await loginService.handleLogin(req.body.email, req.body.password);
        return res.redirect("/dashboard");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
};

controller.checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

controller.checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

controller.postLogOut = (req, res) => {
    req.session.destroy(function (err) {
        return res.redirect("/login");
    });
};

module.exports = controller
