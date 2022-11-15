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

module.exports = {
    getAllTechnicals
}