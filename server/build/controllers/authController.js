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

    const users = await User.getAll()

    if (users) {
        res.json(users)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener usuarios')

    }

}

authController.update = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getAllPermissions(userRoleID)

    if (userPermissions.includes(2)) {
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
                    updated_by: userID,
                    updated_at: date
                }, name],
            )
            res.status(200).send('Usuario actualizado.')
        } catch (error) {
            res.status(400).send('Combinacion de correo y contrasena equivocada.')
        }
    } else {
        res.status(400).send('No tienes permiso.')
    }
}

authController.register = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getAllPermissions(userRoleID)

    if (userPermissions.includes(1)) {
        const password = await bcrypt.hash(req.body.password, 10)
        const date = new Date()

        const { name, first_surname, second_surname, email } = req.body;

        const user = await User.getUserByEmail(email);

        if (!user) {
            connection.query("INSERT INTO `users` SET ?", [{
                name,
                first_surname,
                second_surname,
                email,
                password,
                is_active: 01,
                created_by: userID,
                created_at: date,
                updated_at: date
            }]
            )
            res.status(200).send('Usuario creado.')
        } else {
            res.status(400).send('Combinacion de correo y contrasena equivocada.')
        }
    } else {
        res.status(400).send('No tienes permiso.')
    }
}

authController.showLogin = (req, res) => {

}

authController.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);

    if (!user) {
        res.status(400).json({ error: "User Doesn't Exist" });
    } else {
        const dbPassword = user.password;
        await bcrypt.compare(password, dbPassword).then((match) => {
            if (!match) {
                res
                    .status(400)
                    .json({ error: "Wrong Username and Password Combination!" });
            } else {

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


}

authController.delete = async (req, res) => {
    const name = req.params.name
    const deleted = await User.deleteByName(name);

    if (deleted) {
        res.status(200).send('Usuario borrado.')
    } else {
        res.status(400).send('Error al borrar usuario')
    }

}

authController.dashboard = (req, res) => {

}

authController.permissions = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
}
module.exports = authController;