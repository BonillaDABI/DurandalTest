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
const crypto = require('crypto')
const sendEmail = require('../lib/email')
const moment = require('moment');
const { ClientRequest } = require("http");
const Client = require('../lib/clients')
const Techs = require('../lib/technicals');

const authController = {}

authController.listAll = async (req, res) => {

    var users = await User.getAll()

    for (let i = 0; i < users.length; i++) {
        users[i].created_at = moment(users[i].created_at).format("MMMM Do YY")
        if (users[i].is_active === 1) {
            users[i].is_active = "Activo"
        } else {
            users[i].is_active = "Inactivo"
        }
    }

    if (users) {
        res.json(users)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener usuarios')
    }

}

authController.listClients = async (req, res) => {

    var clients = await Client.getAllClients()

    for (let i = 0; i < clients.length; i++) {
        clients[i].created_at = moment(clients[i].created_at).format("MMMM Do YY")
        if (clients[i].is_active === 1) {
            clients[i].is_active = "Activo"
        } else {
            clients[i].is_active = "Inactivo"
        }
    }

    if (clients) {
        res.json(clients)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener usuarios')
    }

}

authController.listTechnicals = async (req, res) => {
    var techs = await Techs.getAllTechnicals()

    for (let i = 0; i < techs.length; i++) {
        techs[i].created_at = moment(techs[i].created_at).format("MMMM Do YY")
        if (techs[i].is_active === 1) {
            techs[i].is_active = "Activo"
        } else {
            techs[i].is_active = "Inactivo"
        }
    }

    if (techs) {
        res.json(techs)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener tecnicos')
    }
}

authController.update = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

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

authController.updateClient = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    if (userPermissions.includes(2)) {
        const date = new Date()
        const { user_id } = req.body;
        const { business_name, rfc, tax_id, parent_id } = req.body;

        try {
            await connection.query(
                "UPDATE clients SET ? WHERE user_id = ?",
                [{
                    business_name,
                    rfc,
                    tax_id,
                    parent_id,
                    updated_by: userID,
                    updated_at: date
                }, user_id],
            )
            res.status(200).send('Cliente actualizado.')
        } catch (error) {
            res.status(400).send('Error al actualizar cliente.')
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
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

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
            res.status(400).send('Usuario ya existe.')
        }
    } else {
        res.status(400).send('No tienes permiso.')
    }
}

authController.protect = async (req, res, next) => {
    const token = req.body.Authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    req.userPermissions = userPermissions
    req.userID = userID
    next()
}

authController.sendUserIDsClients = async (req, res) => {
    //Mandar posibles user_id donde rol = cliente
    const availableClients = await Client.sendClients()
    const activeTaxes = await Client.sendTaxes()
    res.json({ availableClients, activeTaxes })

}

authController.sendRoles = async (req, res) => {
    //Mandar posibles roles_id
    const activeRoles = await User.getRoles()
    res.json(activeRoles)
}

authController.sendParentID = async (req, res) => {
    //Mandar parents_id
    const parentsID = await Client.sendParentsID()
    res.json(parentsID);
}

authController.createClient = async (req, res) => {

    if (req.userPermissions.includes(1)) {

        const date = new Date()

        const { user_id, business_name, rfc, tax_id } = req.body

        const client = await Client.getClientByRFC(rfc)

        if (!client) {
            await Client.insertClient(user_id, business_name, rfc, tax_id, req.userID, date)
            res.status(200).json('Cliente creado.')
        } else {
            res.status(400).json('Cliente ya existe.')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.createTechnical = async (req, res) => {

    if (req.userPermissions.includes(1)) {

        const date = new Date()

        const { user_id } = req.body

        const tech = await Techs.getTechByUserID(user_id)

        if (!tech) {
            await Client.insertTech(user_id, req.userID, date)
            res.status(200).json('Tecnico creado.')
        } else {
            res.status(400).json('Tecnico ya existe.')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.login = async (req, res) => {
    const { email, password } = req.body;

    var user = await User.getUserByEmail(email);

    if (!user) {
        res.status(400).json({ message: "error 400, i fucked it up", error: "User Doesn't Exist" });
    } else {
        const dbPassword = user.password;
        const role_id = user.roles_id
        const user_id = user.id
        const permissions = await User.getAllPermissionsFromUser(role_id, user_id)
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        user.created_at = user.created_at.toLocaleDateString("en-US", options)
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

                res.json({ accessToken, user, permissions })

            }
        });
    }
}

authController.forgotPassword = async (req, res, next) => {
    //Get user email
    const email = req.body.email
    const user = await User.getUserByEmail(email)

    if (!user) {
        res.status(400).send('No existe usuario con ese correo.')
        return next()
    }

    //Generar random token
    const resetToken = crypto.randomBytes(32).toString('hex')

    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log({ resetToken }, { passwordResetToken })


    const passwordResetExpires = new Date()
    passwordResetExpires.setMinutes(passwordResetExpires.getMinutes() + 10);


    connection.query("UPDATE `users` SET ? WHERE email = ?", [{
        passwordResetToken,
        passwordResetExpires
    }, email])

    //Send it to user's email
    const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

    const message = `Forgot your password? Go to: ${resetUrl}`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid 10 min)',
            message
        })

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        })
    } catch (err) {
        res.status(400).json(err)
    }

}

authController.resetPassword = async (req, res) => {
    //Get user based on token
    const hashedToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    const user = await User.getUserByPasswordToken(hashedToken)
    const nodeTime = new Date();

    if (user) {
        const userTime = new Date(user.passwordResetExpires).getTime()
        if (nodeTime < userTime) {
            const password = await bcrypt.hash(req.body.password, 10)
            connection.query("UPDATE `users` SET ? WHERE passwordResetToken = ?", [{
                password,
                passwordResetToken: null,
                passwordResetExpires: null
            }, hashedToken])

            res.status(200).json("Success")
        } else {
            res.status(400).json("Your time expired, try again")
        }
    } else {
        res.status(400).json("No user with that token")
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

authController.deleteClient = async (req, res) => {
    const id = req.params.id
    const deleted = await Client.deleteById(id)

    if (deleted) {
        res.status(200).send('Cliente borrado.')
    } else {
        res.status(400).send('Error al borrar cliente')
    }
}

authController.dashboard = (req, res) => {

}

authController.permissions = async (req, res) => {
    // const token = req.body.Authorization.split(' ')[1];

    // const decodedToken = jwt.verify(token, "jwtsecret")
    // const userID = decodedToken.id
    const permissions = await User.getAllPermissions()

    if (permissions) {
        res.status(200).json(permissions)
    } else {
        res.status(400).send('Error al obtener permisos')
    }
}

authController.modulesANDfunctions = async (req, res) => {
    const id = req.params.id

    const mod = await User.getModuleById(id)
    const func = await User.getFunctionById(id)


    if (mod && func) {
        res.status(200).json([mod, func])
    } else {
        res.status(400).send('Error al obtener permisos')
    }

}

authController.rudPermissions = async (req, res) => {
    const { id, user_id } = req.body
    const id_perms = [05, 06]

    User.addPermissions(user_id, id_perms, id)

}

authController.getAllRoles = async (req, res) => {
    const roles = await User.getRoles()

    if (roles) {
        res.json(roles)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener usuarios')
    }

}

authController.createRoles = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)


    if (userPermissions.includes(9)) {
        const { id, role_name } = req.body
        const role = await User.getRoleById(id)

        if (!role) {
            await User.createRoles(id, role_name)
            res.status(200).send('Rol creado.')
        } else {
            res.status(400).send('Rol ya existe.')
        }

    } else {
        res.status(400).send('No tienes permiso.')
    }
}

authController.updateRoles = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    if (userPermissions.includes(10)) {
        const { id, role_name } = req.body

        try {
            await User.updateRoles(id, role_name)
            res.status(200).send('Rol actualizado.')
        } catch (error) {
            res.status(400).send('Error al actualizar usuario.')
        }

    } else {
        res.status(400).send('No tienes permiso.')
    }
}


module.exports = authController;