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

const updateTech = (id, telefono, fechaNacimiento, user_id, creator_id, is_active, date, updated_reason) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('UPDATE technicals SET ? WHERE id = ?',
            [{
                telefono,
                fechaNacimiento,
                is_active,
                updated_by: creator_id,
                updated_at: date,
                updated_reason,
            }, id], async (err, rows) => {
                if (err) reject(err)
                resolve(true)

                if (is_active === '1') {
                    await connection.query('CALL log_actualizarTecnico(?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, user_id, 3, telefono, fechaNacimiento, 1, creator_id, date, updated_reason])
                } else {
                    await connection.query('CALL log_actualizarTecnico(?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, user_id, 1, telefono, fechaNacimiento, is_active, creator_id, date, updated_reason])
                }
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

const getUserIDFromTech = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT user_id FROM technicals WHERE id = ?', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows[0].user_id)))
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
    getLogs,
    updateTech,
    getUserIDFromTech

}