require('dotenv').config()
const connection = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const moment = require('moment')

const getAllTechnicals = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT t.id, t.is_active, t.created_at, t.telefono, t.fechaNacimiento, u.name, u.email, u.first_surname, u.second_surname FROM technicals t, users u WHERE t.user_id = u.id AND u.roles_id = 2 ', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const getTechnicalByID = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT t.id, t.is_active, t.created_at, u.name, u.first_surname, u.second_surname, t.telefono, t.fechaNacimiento, u.email FROM technicals t, users u WHERE t.user_id = u.id AND t.id = ?', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
}

const getTechByUserID = (userID) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM technicals WHERE user_id = ?', [userID], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows[0])
        })
    })
}

const insertTech = (user_id, telefono, fechaNacimiento, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO technicals SET ?', [{
            user_id,
            telefono,
            fechaNacimiento,
            is_active: 01,
            created_by: creator_id,
            created_at: date,
            updated_at: date
        }], async (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)

            await connection.query('CALL log_createTecnico(?, ?, ?, ?, ?, ?, ?, ?)', [rows.insertId, user_id, 2, telefono, fechaNacimiento, 1, creator_id, date])
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

const getLogs = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT tm.mov_name, tl.telefono, tl.fechaNacimiento, tl.is_active, tl.updated_reason, u.email, u.name, u.first_surname, u.second_surname, tl.created_at, tl.updated_at FROM technical_logs tl, technical_movements tm, users u WHERE tl.technical_id = ? AND tl.user_id = u.id AND tm.id = tl.technical_movement_id', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

module.exports = {
    getAllTechnicals,
    getTechByUserID,
    insertTech,
    sendTechs,
    deleteById,
    getTechnicalByID,
    getLogs

}