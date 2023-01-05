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
const Equipo = require('../lib/equipments')
const Item = require('../lib/items')
const Asset = require('../lib/assets')
const Visits = require('../lib/visits')


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

authController.listEquipments = async (req, res) => {
    var equips = await Equipo.getAllEquipments()
    moment.locale('es-mx')
    for (let i = 0; i < equips.length; i++) {
        equips[i].updated_at = moment(equips[i].updated_at).format("ll")
        if (equips[i].is_active === 1) {
            equips[i].is_active = "Activo"
        } else {
            equips[i].is_active = "Inactivo"
        }
    }

    if (equips) {
        res.json(equips)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener equipos')
    }
}

authController.listequipLogs = async (req, res) => {
    const id = req.params.id
    var equipLogs = await Equipo.getLogs(id)
    moment.locale('es-mx')
    for (let i = 0; i < equipLogs.length; i++) {
        equipLogs[i].updated_at = moment(equipLogs[i].updated_at).format("ll")
        equipLogs[i].updated_at = moment(equipLogs[i].created_at).format("ll")
        if (equipLogs[i].is_active === 1) {
            equipLogs[i].is_active = "Activo"
        } else {
            equipLogs[i].is_active = "Inactivo"
        }
    }

    if (equipLogs) {
        res.json(equipLogs)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener items')
    }
}

authController.listItems = async (req, res) => {
    var item = await Item.getAllItems()
    moment.locale('es-mx')
    for (let i = 0; i < item.length; i++) {
        item[i].updated_at = moment(item[i].updated_at).format("ll")
        if (item[i].is_active === 1) {
            item[i].is_active = "Activo"
        } else {
            item[i].is_active = "Inactivo"
        }
    }

    if (item) {
        res.json(item)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener items')
    }
}

authController.listAssets = async (req, res) => {
    var asset = await Asset.getAssets()
    moment.locale('es-mx')
    for (let i = 0; i < asset.length; i++) {
        asset[i].updated_at = moment(asset[i].updated_at).format("ll")
        if (asset[i].is_active === 1) {
            asset[i].is_active = "Activo"
        } else {
            asset[i].is_active = "Inactivo"
        }
    }

    if (asset) {
        res.json(asset)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener items')
    }
}

authController.listAssetsLogs = async (req, res) => {
    const id = req.params.id
    var assetLogs = await Asset.getLogs(id)
    moment.locale('es-mx')
    for (let i = 0; i < assetLogs.length; i++) {
        assetLogs[i].updated_at = moment(assetLogs[i].updated_at).format("ll")
        assetLogs[i].updated_at = moment(assetLogs[i].created_at).format("ll")
        if (assetLogs[i].is_active === 1) {
            assetLogs[i].is_active = "Activo"
        } else {
            assetLogs[i].is_active = "Inactivo"
        }
    }

    if (assetLogs) {
        res.json(assetLogs)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener items')
    }
}

authController.listVisits = async (req, res) => {
    var visits = await Visits.getVisits()
    moment.locale('es-mx')
    for (let i = 0; i < visits.length; i++) {
        visits[i].updated_at = moment(visits[i].updated_at).format("ll")
        if (visits[i].is_active === 1) {
            visits[i].is_active = "Activo"
        } else {
            visits[i].is_active = "Inactivo"
        }
    }

    if (visits) {
        res.json(visits)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener visitas.')
    }
}

authController.listVisitsLogs = async (req, res) => {
    const id = req.params.id
    var visitLogs = await Visits.getLogs(id)
    moment.locale('es-mx')
    for (let i = 0; i < visitLogs.length; i++) {
        visitLogs[i].updated_at = moment(visitLogs[i].updated_at).format("ll")
        visitLogs[i].updated_at = moment(visitLogs[i].created_at).format("ll")
        if (visitLogs[i].is_active === 1) {
            visitLogs[i].is_active = "Activo"
        } else {
            visitLogs[i].is_active = "Inactivo"
        }
    }

    if (visitLogs) {
        res.json(visitLogs)
        // res.status(200).send('Usuarios creados')
    } else {
        res.status(400).send('Error al obtener items')
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

authController.updateEquipment = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];
    const id = req.params.id

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    if (userPermissions.includes(2)) {
        const date = new Date()
        const { equip_name, description, brand_id, is_active, updated_reason } = req.body;

        try {
            await Equipo.updateEquipment(id, equip_name, is_active, brand_id, description, userID, date, updated_reason)

            res.status(200).send('Equipo actualizado.')
        } catch (error) {
            res.status(400).send('Error al actualizar equipo.')
        }
    } else {
        res.status(400).send('No tienes permiso.')
    }
}

authController.updateEquipmentAttr = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];
    const id = req.params.id

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    if (userPermissions.includes(2)) {
        const date = new Date()
        const { name, description, dimensiones } = req.body;

        try {
            await Equipo.updateAttr(id, name, description, dimensiones, userID, date)

            res.status(200).send('Atributo actualizado.')
        } catch (error) {
            res.status(400).send('Error al actualizar atributo.')
        }
    } else {
        res.status(400).send('No tienes permiso.')
    }
}

authController.updateItem = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];
    const id = req.params.id

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    if (userPermissions.includes(2)) {
        const date = new Date()
        const { name, is_active, description, cost, unit_id, currency_id, updated_reason } = req.body;

        try {

            await Item.updateItem(id, name, is_active, description, cost, unit_id, currency_id, userID, date, updated_reason)

            res.status(200).send('Item actualizado.')

        } catch (error) {

            res.status(400).send('Error al actualizar item.')

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
    const client_id = await Site.getClientIdFromSite(id);

    if (userPermissions.includes(2)) {
        const date = new Date()
        const { site_name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, is_active, updated_reason } = req.body;

        try {
            const updateSite = await Site.updateSiteByID(id, client_id, site_name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, userID, date, is_active, updated_reason)

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

authController.updateTechnical = async (req, res) => {
    const token = req.body.Authorization.split(' ')[1];
    const id = req.params.id

    const decodedToken = jwt.verify(token, "jwtsecret")
    const userID = decodedToken.id
    // const userID = validateToken()
    const userRoleID = await User.getUserRoleID(userID);
    const userPermissions = await User.getPermissionByRoleId(userRoleID)

    if (userPermissions.includes(2)) {
        const user_id = await Techs.getUserIDFromTech(id)
        const date = new Date()
        const { name } = req.body;
        const password = await bcrypt.hash(req.body.password, 10)
        const { first_surname, second_surname, email, telefono, fechaNacimiento, is_active, updated_reason } = req.body;

        try {
            await connection.query(
                "UPDATE users SET ? WHERE id = ?",
                [{
                    name,
                    first_surname,
                    second_surname,
                    email,
                    password,
                    is_active,
                    updated_by: userID,
                    updated_at: date,
                    updated_reason
                }, user_id],
            )

            const updatedTech = await Techs.updateTech(id, telefono, fechaNacimiento, user_id, userID, is_active, date, updated_reason)

            if (updatedTech) {
                res.status(200).send('Tecnico actualizado.')
            }

        } catch (error) {
            res.status(400).send('Error al actualizar tecnico.')
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
        const user_id = Techs.getUserIDFromTech(id)
        const date = new Date()
        const { name } = req.body;
        const password = await bcrypt.hash(req.body.password, 10)
        const { first_surname, second_surname, email, is_active, updated_reason, telefono } = req.body;

        try {
            await connection.query(
                "UPDATE users SET ? WHERE id = ?",
                [{
                    name,
                    first_surname,
                    second_surname,
                    email,
                    password,
                    is_active,
                    updated_by: userID,
                    updated_at: date,
                    updated_reason
                }, user_id],
            )

            const updatedContact = await Contact.updateContact(id, telefono, userID, is_active, date, updated_reason)

            if (updatedContact) {
                res.status(200).send('Contacto actualizado.')
            }

        } catch (error) {
            res.status(400).send('Error al actualizar contacto.')
        }
    } else {
        res.status(400).send('No tienes permiso.')
    }
}

authController.updateAsset = async (req, res) => {

    if (req.userPermissions.includes(2)) {
        const id = req.params.id

        const date = new Date()

        const { asset_name, is_active, description, site_id, equipment_id, asset_active_status_id, updated_reason } = req.body;

        const updatedAsset = await Asset.updateAsset(id, asset_name, is_active, description, site_id, equipment_id, asset_active_status_id, req.userID, date, updated_reason)

        if (updatedAsset) {
            res.status(200).json('Asset actualizado.')
        } else {
            res.status(400).json('Error al actualizar asset.')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.updateVisit = async (req, res) => {

    if (req.userPermissions.includes(2)) {
        const id = req.params.id

        const date = new Date()

        const { visit_type_id, site_id, technical_id, visit_name, description, is_active, updated_reason } = req.body;

        const updatedVisit = await Visits.updateVisit(id, visit_type_id, site_id, technical_id, visit_name, is_active, description, req.userID, date, updated_reason)

        if (updatedVisit) {
            res.status(200).json('Visit actualizado.')
        } else {
            res.status(400).json('Error al actualizar visit.')
        }

    } else {
        res.status(400).json('No tienes permiso.')
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

authController.sendBrands = async (req, res) => {
    //Mandar tipos de contactos
    const brands = await Equipo.sendBrands()
    res.json(brands)
}

authController.sendCurrenciesAndUnits = async (req, res) => {
    //Mandar tipos de contactos
    const currencies = await Item.sendCurrency()
    const units = await Item.sendUnits()
    res.json({ currencies, units })
}

authController.sendSitesAndEquips = async (req, res) => {
    //Mandar tipos de contactos
    const sites = await Asset.sendSites()
    const equips = await Asset.sendEquipments()
    const statuses = await Asset.sendAssetsStatus()
    res.json({ sites, equips, statuses })
}

authController.sendVisitInfo = async (req, res) => {
    //Mandar tipos de contactos
    const sites = await Visits.sendSites()
    const visitTypes = await Visits.sendVisitTypes()
    const techs = await Visits.sendTechnicals()
    res.json({ sites, visitTypes, techs })
}

authController.updateEquipmentInfo = async (req, res) => {
    const id = req.params.id
    var equipInfo = await Equipo.sendEquipInfo(id)
    const equipAttrInfo = await Equipo.getEquipAttrs(id)
    if (equipInfo.is_active === 1) {
        equipInfo.is_active = "Activo"
    } else {
        equipInfo.is_active = "Inactivo"
    }

    res.json({ equipInfo, equipAttrInfo })

}

authController.autofillAttrs = async (req, res) => {
    const AttrsInfo = await Equipo.sendAttrs()

    res.json(AttrsInfo)

}

authController.updateItemInfo = async (req, res) => {
    const id = req.params.id
    var itemInfo = await Item.sendItemInfo(id)
    if (itemInfo.is_active === 1) {
        itemInfo.is_active = "Activo"
    } else {
        itemInfo.is_active = "Inactivo"
    }

    res.json(itemInfo)

}

authController.updateVisitInfo = async (req, res) => {
    const id = req.params.id
    var visitInfo = await Visits.sendVisitInfo(id)
    if (visitInfo.is_active === 1) {
        visitInfo.is_active = "Activo"
    } else {
        visitInfo.is_active = "Inactivo"
    }

    res.json(visitInfo)

}

authController.updateAssetInfo = async (req, res) => {
    const id = req.params.id
    var assetInfo = await Asset.sendAssetInfo(id)
    if (assetInfo.is_active === 1) {
        assetInfo.is_active = "Activo"
    } else {
        assetInfo.is_active = "Inactivo"
    }

    res.json(assetInfo)

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

authController.createEquipment = async (req, res) => {

    if (req.userPermissions.includes(1)) {
        const date = new Date()

        const { name, description, brand_id } = req.body;

        const createdEquipID = await Equipo.insertEquipment(name, description, brand_id, req.userID, date)

        const createdEquipInfo = await Equipo.getEquipmentByID(createdEquipID)

        if (createdEquipID) {
            res.status(200).json({ createdEquipID, createdEquipInfo })
        } else {
            res.status(400).json('Error al crear equipo')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.createItem = async (req, res) => {

    if (req.userPermissions.includes(1)) {
        const date = new Date()

        const { name, description, cost, unit_id, currency_id } = req.body;

        const createdItem = await Item.insertItem(name, description, cost, unit_id, currency_id, req.userID, date)

        if (createdItem) {
            res.status(200).json(createdItem)
        } else {
            res.status(400).json('Error al crear consumible')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.createEquipmentAttr = async (req, res) => {

    if (req.userPermissions.includes(1)) {
        const date = new Date()

        const { name, description, dimensiones, equipment_id, value } = req.body;

        const createdAttrID = await Equipo.insertEquipmentAttr(name, description, dimensiones, req.userID, date)


        if (createdAttrID) {
            const insertedEqVal = await Equipo.insertEquipmentVal(equipment_id, createdAttrID, value, req.userID, date)

            if (insertedEqVal) {
                const createdEquipAttr = await Equipo.getEquipAttrs(equipment_id)
                res.status(200).json(createdEquipAttr)
            }
        } else {
            res.status(400).json('Error al crear atributo.')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.createItemAttr = async (req, res) => {

    if (req.userPermissions.includes(1)) {
        const date = new Date()

        const { name, description, dimensiones, item_id, value } = req.body;

        const createdAttrID = await Item.insertItemAttr(name, description, dimensiones, req.userID, date)

        if (createdAttrID) {
            const insertedItemVal = await Item.insertItemVal(item_id, createdAttrID, value, req.userID, date)

            if (insertedItemVal) {
                res.status(200).json('Atributo registrado.')
            }
        } else {
            res.status(400).json('Error al crear atributo.')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.createAsset = async (req, res) => {

    if (req.userPermissions.includes(1)) {
        const date = new Date()

        const { name, description, site_id, equipment_id, asset_active_status_id } = req.body;

        const createdAsset = await Asset.insertAsset(name, description, site_id, equipment_id, asset_active_status_id, req.userID, date)

        if (createdAsset) {
            res.status(200).json('Asset creado.')
        } else {
            res.status(400).json('Error al crear asset')
        }

    } else {
        res.status(400).json('No tienes permiso.')
    }
}

authController.createVisit = async (req, res) => {

    if (req.userPermissions.includes(1)) {
        const date = new Date()

        const { visit_type_id, site_id, technical_id, visit_name, description, } = req.body;

        const createdVisit = await Visits.insertVisit(visit_type_id, site_id, technical_id, visit_name, description, req.userID, date)

        if (createdVisit) {
            res.status(200).json('Visit creado.')
        } else {
            res.status(400).json('Error al crear visit')
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
        const sidebar = await User.sendSideBar(role_id, user_id)
        console.log(sidebar)
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

authController.deleteEquip = async (req, res) => {
    const id = req.params.id
    const deleted = await Equipo.deleteById(id)

    if (deleted) {
        res.status(200).send('Equipo borrado.')
    } else {
        res.status(400).send('Error al borrar equipo')
    }
}

authController.deleteItem = async (req, res) => {
    const id = req.params.id
    const deleted = await Item.deleteById(id)

    if (deleted) {
        res.status(200).send('Item borrado.')
    } else {
        res.status(400).send('Error al borrar item')
    }
}

authController.deleteAsset = async (req, res) => {
    const id = req.params.id
    const deleted = await Asset.deleteById(id)

    if (deleted) {
        res.status(200).send('Asset borrado.')
    } else {
        res.status(400).send('Error al borrar asset')
    }
}

authController.deleteVisit = async (req, res) => {
    const id = req.params.id
    const deleted = await Visits.deleteById(id)

    if (deleted) {
        res.status(200).send('Visit borrado.')
    } else {
        res.status(400).send('Error al borrar visit,')
    }
}

authController.deleteAttr = async (req, res) => {
    const id = req.params.id
    const deleted = await Equipo.deleteAttrById(id)

    if (deleted) {
        res.status(200).send('Visit borrado.')
    } else {
        res.status(400).send('Error al borrar visit,')
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
    const { user_id } = req.body
    const id_perms = [05, 06]

    const addedPerms = await User.addPermissions(user_id, id_perms)

    if (addedPerms) {
        res.status(200).json('Permisos creados')
    } else {
        res.status(400).json('Error al obtener usuarios')
    }

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