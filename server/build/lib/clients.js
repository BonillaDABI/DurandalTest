require('dotenv').config()
const connection = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const moment = require('moment')

const getClientByRFC = (rfc) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM clients WHERE rfc = ?', [rfc], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows[0])
        })
    })
}

const getClientByUserID = (user_id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM clients WHERE user_id = ?', [user_id], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows[0])
        })
    })
}

const insertClient = (user_id, business_name, rfc, tax_id, creator_id, date, parent_id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO clients SET ?', [{
            user_id,
            business_name,
            rfc,
            tax_id,
            is_active: 01,
            created_by: creator_id,
            created_at: date,
            updated_at: date,
            parent_id
        }], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const getAllClients = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('Select id, user_id, business_name, is_active, created_at FROM clients ', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const sendClients = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('Select id FROM users WHERE roles_id = 10', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendTaxes = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, name FROM taxes', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendParentsID = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id FROM clients', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.query(
                ' DELETE FROM `clients` WHERE `id` = ?  ', id,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(true);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    getClientByRFC,
    insertClient,
    getAllClients,
    sendClients,
    sendTaxes,
    sendParentsID,
    getClientByUserID,
    deleteById
}