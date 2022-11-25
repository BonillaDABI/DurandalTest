require('dotenv').config()
const connection = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const moment = require('moment')

const getAllTechnicals = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT t.id, t.is_active, t.created_at, u.name, u.email FROM technicals t, users u WHERE t.user_id = u.id AND u.roles_id = 2 ', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const getTechByUserID = (userID) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM technicals WHERE user_id = ?', [userID], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows[0])
        })
    })
}

const insertTech = (user_id, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO technicals SET ?', [{
            user_id,
            is_active: 01,
            created_by: creator_id,
            created_at: date,
            updated_at: date
        }], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const sendTechs = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('Select id FROM users WHERE roles_id = 2', (err, rows) => {
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
                ' DELETE FROM `technicals` WHERE `id` = ?  ', id,
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
}

module.exports = {
    getAllTechnicals,
    getTechByUserID,
    insertTech,
    sendTechs,
    deleteById

}