require('dotenv').config()
const connection = require('../config/database')

const insertContact = (user_id, client_id, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO contacts SET ?', [{
            user_id,
            client_id,
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

const getAllContacts = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT co.id, u.name, u.email, cl.business_name, co.is_active, co.created_at FROM contacts co, clients cl, users u WHERE co.user_id = u.id AND co.client_id = cl.id', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

module.exports = {
    insertContact,
    getAllContacts
}