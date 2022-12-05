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
const Contact = require('../lib/contact')
const Site = require('../lib/sites')


const authController = {}

authController.listAll = async (req, res) => {

    var users = await User.getAll()
    moment.locale('es-mx')
    for (let i = 0; i < users.length; i++) {
        users[i].created_at = moment(users[i].created_at).format("ll")
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
    moment.locale('es-mx')
    for (let i = 0; i < clients.length; i++) {
        clients[i].created_at = moment(clients[i].created_at).format("ll")
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

authController.listClientByID = async (req, res) => {
    const id = req.params.id
    var clients = await Client.listClientByID(id)
    moment.locale('es-mx')
    // for (let i = 0; i < clients.length; i++) {
    //     clients[i].created_at = moment(clients[i].created_at).format("LL")
    //     if (clients[i].is_active === 1) {
    //         clients[i].is_active = "Activo"
    //     } else {
    //         clients[i].is_active = "Inactivo"
    //     }
    // }

    if (clients) {
        res.json(clients)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener usuarios')
    }

}

authController.listContacts = async (req, res) => {
    var contacts = await Contact.getAllContactsByID(client_id)
    moment.locale('es-mx')
    if (contacts) {

        for (let i = 0; i < contacts.length; i++) {
            contacts[i].created_at = moment(contacts[i].created_at).format("ll")
            if (contacts[i].is_active === 1) {
                contacts[i].is_active = "Activo"
            } else {
                contacts[i].is_active = "Inactivo"
            }
        }

        res.json(contacts)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener usuarios')
    }
}

authController.listSites = async (req, res) => {
    var sites = await Site.getAllSites()
    moment.locale('es-mx')
    if (sites) {

        for (let i = 0; i < sites.length; i++) {
            sites[i].created_at = moment(sites[i].created_at).format("ll")
            if (sites[i].is_active === 1) {
                sites[i].is_active = "Activo"
            } else {
                sites[i].is_active = "Inactivo"
            }
        }

        res.json(sites)
    } else {
        res.status(400).send('Error al obtener sitios')
    }
}

authController.listSitesByClientID = async (req, res) => {
    const client_id = req.params.id
    var sites = await Site.getSitesByClientID(client_id)
    moment.locale('es-mx')
    if (sites) {

        for (let i = 0; i < sites.length; i++) {
            sites[i].created_at = moment(sites[i].created_at).format("ll")
            if (sites[i].is_active === 1) {
                sites[i].is_active = "Activo"
            } else {
                sites[i].is_active = "Inactivo"
            }
        }

        res.json(sites)
    } else {
        res.status(400).send('Error al obtener sitios')
    }
}

authController.listSitesByID = async (req, res) => {
    const id = req.params.id
    var sites = await Site.getSitesByID(id)
    moment.locale('es-mx')
    if (sites) {

        for (let i = 0; i < sites.length; i++) {
            sites[i].created_at = moment(sites[i].created_at).format("ll")
            if (sites[i].is_active === 1) {
                sites[i].is_active = "Activo"
            } else {
                sites[i].is_active = "Inactivo"
            }
        }

        res.json(sites)
    } else {
        res.status(400).send('Error al obtener sitios')
    }
}

authController.listTechnicals = async (req, res) => {
    var techs = await Techs.getAllTechnicals()
    moment.locale('es-mx')
    for (let i = 0; i < techs.length; i++) {
        techs[i].created_at = moment(techs[i].created_at).format("ll")
        techs[i].fechaNacimiento = moment(techs[i].fechaNacimiento).format("ll")
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

authController.listTechnicalByID = async (req, res) => {
    const id = req.params.id
    var techs = await Techs.getTechnicalByID(id)
    var techLogs = await Techs.getLogs(id)
    moment.locale('es-mx')
    for (let i = 0; i < techs.length; i++) {
        techs[i].created_at = moment(techs[i].created_at).format("ll")
        techs[i].fechaNacimiento = moment(techs[i].fechaNacimiento).format("ll")
        if (techs[i].is_active === 1) {
            techs[i].is_active = "Activo"
        } else {
            techs[i].is_active = "Inactivo"
        }
    }

    for (let i = 0; i < techLogs.length; i++) {
        techLogs[i].created_at = moment(techLogs[i].created_at).format("ll")
        techLogs[i].fechaNacimiento = moment(techLogs[i].fechaNacimiento).format("ll")
        techLogs[i].updated_at = moment(techLogs[i].updated_at).format("ll")
        if (techLogs[i].is_active === 1) {
            techLogs[i].is_active = "Activo"
        } else {
            techLogs[i].is_active = "Inactivo"
        }
    }

    if (techs) {
        res.json({ techs, techLogs })
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener tecnicos')
    }
}

authController.listSitesLogsByID = async (req, res) => {
    const id = req.params.id
    var siteLogs = await Site.getLogs(id)
    moment.locale('es-mx')

    for (let i = 0; i < siteLogs.length; i++) {
        siteLogs[i].created_at = moment(siteLogs[i].created_at).format("ll")
        siteLogs[i].updated_at = moment(siteLogs[i].updated_at).format("ll")
        if (siteLogs[i].is_active === 1) {
            siteLogs[i].is_active = "Activo"
        } else {
            siteLogs[i].is_active = "Inactivo"
        }
    }

    if (siteLogs) {
        res.json(siteLogs)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener tecnicos')
    }
}

authController.listClientAndContacts = async (req, res) => {
    const id = req.params.id
    var clientDetails = await Client.listClientByID(id)
    var clientContacts = await Contact.getAllContactsByID(id)
    const activeTaxes = await Client.sendTaxes()
    moment.locale('es-mx')

    if (clientDetails && clientContacts) {

        // for (let i = 0; i < clientDetails.length; i++) {
        //     clientDetails[i].created_at = moment(clientDetails[i].created_at).format("LL")
        //     if (clientDetails[i].is_active === 1) {
        //         clientDetails[i].is_active = "Activo"
        //     } else {
        //         clientDetails[i].is_active = "Inactivo"
        //     }
        // }

        for (let i = 0; i < clientContacts.length; i++) {
            clientContacts[i].created_at = moment(clientContacts[i].created_at).format("LL")
            if (clientContacts[i].is_active === 1) {
                clientContacts[i].is_active = "Activo"
            } else {
                clientContacts[i].is_active = "Inactivo"
            }
        }

        res.json({ clientDetails, clientContacts, activeTaxes })

    } else {
        res.status(400).send('Error al obtener Cliente')
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
    const id = req.params.id

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    if (userPermissions.includes(2)) {
        const date = new Date()
        const { business_name, rfc, tax_id } = req.body;

        try {
            await connection.query(
                "UPDATE clients SET ? WHERE id = ?",
                [{
                    business_name,
                    rfc,
                    tax_id,
                    updated_by: userID,
                    updated_at: date
                }, id],
            )
            res.status(200).send('Cliente actualizado.')
        } catch (error) {
            res.status(400).send('Error al actualizar cliente.')
        }
    } else {
        res.status(400).send('No tienes permiso.')
    }
}

authController.updateSite = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];
    const id = req.params.id

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    if (userPermissions.includes(2)) {
        const date = new Date()
        const { name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code } = req.body;

        try {
            const updateSite = await Site.updateSiteByID(id, name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, userID, date)

            if (updateSite) {
                res.status(200).send('Sitio actualizado.')
            }

        } catch (error) {
            res.status(400).send('Error al actualizar sitio.')
        }
    } else {
        res.status(400).send('No tienes permiso.')
    }
}

authController.updateContact = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];
    const id = req.params.id

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    if (userPermissions.includes(2)) {
        const date = new Date()
        const { name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code } = req.body;

        try {
            const updateSite = await Site.updateSiteByID(id, name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, userID, date)

            if (updateSite) {
                res.status(200).send('Sitio actualizado.')
            }

        } catch (error) {
            res.status(400).send('Error al actualizar sitio.')
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

        const { name, first_surname, second_surname, email, roles_id } = req.body;

        const user = await User.getUserByEmail(email);

        if (!user) {
            connection.query("INSERT INTO `users` SET ?", [{
                name,
                first_surname,
                second_surname,
                email,
                password,
                roles_id,
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
    const parentsID = await Client.sendParentsID()
    const activeTaxes = await Client.sendTaxes()
    res.json({ parentsID, activeTaxes })

}

authController.sendContactTypes = async (req, res) => {
    //Mandar tipos de contactos
    const activeTypes = await Contact.sendContactTypes()
    res.json(activeTypes)
}

authController.sendRoles = async (req, res) => {
    //Mandar posibles roles_id
    const activeRoles = await User.getRoles()
    res.json(activeRoles)
}

authController.sendTechs = async (req, res) => {
    const sendtechs = await Techs.sendTechs()
    res.json(sendtechs)
}

authController.sendCountryDetails = async (req, res) => {
    const countries = await Site.sendCountryDetails()
    const states = await Site.sendStateDetails()
    const cities = await Site.sendCityDetails()
    const colonies = await Site.sendColonyDetails()
    res.json({ countries, states, cities, colonies })
}

// authController.sendParentID = async (req, res) => {
//     //Mandar parents_id
//     const parentsID = await Client.sendParentsID()
//     res.json(parentsID);
// }

authController.createClient = async (req, res) => {

    if (req.userPermissions.includes(1)) {
        const password = await bcrypt.hash(req.body.password, 10)
        const date = new Date()

        const { name, first_surname, second_surname, email, business_name, rfc, tax_id } = req.body;

        const user = await User.getUserByEmail(email);

        if (!user) {
            connection.query("INSERT INTO `users` SET ?", [{
                name,
                first_surname,
                second_surname,
                email,
                password,
                roles_id: 10,
                is_active: 01,
                created_by: req.userID,
                created_at: date,
                updated_at: date
            }], async (err, result) => {
                if (err) {
                    res.status(500).json('Error al crear usuario.')
                }
                const userID = result.insertId;


                const client = await Client.getClientByRFC(rfc)

                if (!client) {
                    const cClient = await Client.insertClient(userID, business_name, rfc, tax_id, req.userID, date)

                    await Contact.insertContact(userID, cClient.insertId, req.userID, date)

                    res.status(200).json('Cliente y contacto creado.')
                } else {
                    res.status(400).json('Cliente ya existe.')
                }

            })
        } else {
            res.status(400).send('Usuario ya existe.')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.createSite = async (req, res) => {

    if (req.userPermissions.includes(1)) {
        const date = new Date()
        const client_id = req.params.id

        const { name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code } = req.body;

        const createdSite = await Site.insertSite(client_id, name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, req.userID, date)

        if (createdSite) {
            res.status(200).json('Sitio creado.')
        } else {
            res.status(400).json('Error al crear sitio')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.extraContact = async (req, res) => {

    if (req.userPermissions.includes(1)) {
        const password = await bcrypt.hash(req.body.password, 10)
        const date = new Date()
        const client_id = req.params.id

        const { name, first_surname, second_surname, email, contact_type_id } = req.body;

        const user = await User.getUserByEmail(email);

        if (!user) {
            connection.query("INSERT INTO `users` SET ?", [{
                name,
                first_surname,
                second_surname,
                email,
                password,
                roles_id: 10,
                is_active: 01,
                created_by: req.userID,
                created_at: date,
                updated_at: date
            }], async (err, result) => {
                if (err) {
                    res.status(500).json('Error al crear usuario.')
                }
                const userID = result.insertId;


                if (contact_type_id === '1') {
                    await Contact.updateContacts(client_id)
                }

                const cont = await Contact.insertExtraContact(userID, client_id, req.userID, date, contact_type_id)

                if (cont) {
                    res.status(200).json('Contacto creado.')
                } else {
                    res.status(400).json('Error al crear contacto')
                }

            })
        } else {
            res.status(400).send('Usuario ya existe.')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}



authController.createTechnical = async (req, res) => {

    if (req.userPermissions.includes(1)) {

        const password = await bcrypt.hash(req.body.password, 10)
        const date = new Date()

        const { name, first_surname, second_surname, email, telefono, fechaNacimiento } = req.body;

        const user = await User.getUserByEmail(email);

        if (!user) {
            connection.query("INSERT INTO `users` SET ?", [{
                name,
                first_surname,
                second_surname,
                email,
                password,
                roles_id: 2,
                is_active: 01,
                created_by: req.userID,
                created_at: date,
                updated_at: date
            }], async (err, result) => {
                if (err) {
                    res.status(500).json('Error al crear usuario.')
                }
                const userID = result.insertId;
                const tech = await Techs.getTechByUserID(userID)

                if (!tech) {
                    await Techs.insertTech(userID, telefono, fechaNacimiento, req.userID, date)
                    res.status(200).json('Tecnico creado.')
                } else {
                    res.status(400).json('Tecnico ya existe.')
                }
            })

        } else {
            res.status(400).json('No tienes permiso.')
        }
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
    const id = req.params.id
    const deleted = await User.deleteById(id);

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

authController.deleteCont = async (req, res) => {
    const id = req.params.id
    const deleted = await Contact.deleteById(id)

    if (deleted) {
        res.status(200).send('Contacto borrado.')
    } else {
        res.status(400).send('Error al borrar contacto')
    }
}

authController.deleteTech = async (req, res) => {
    const id = req.params.id
    const deleted = await Techs.deleteById(id)

    if (deleted) {
        res.status(200).send('Tecnico borrado.')
    } else {
        res.status(400).send('Error al borrar tecnico')
    }
}

authController.deleteSite = async (req, res) => {
    const id = req.params.id
    const deleted = await Site.deleteById(id)

    if (deleted) {
        res.status(200).send('Site borrado.')
    } else {
        res.status(400).send('Error al borrar site')
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