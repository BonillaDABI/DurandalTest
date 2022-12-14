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
            updated_at: date,
            contact_type_id: 1
        }], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const insertExtraContact = (user_id, client_id, creator_id, date, contact_type_id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO contacts SET ?', [{
            user_id,
            client_id,
            is_active: 01,
            created_by: creator_id,
            created_at: date,
            updated_at: date,
            contact_type_id
        }], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const sendContactTypes = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, type FROM contact_type', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendClientsContacts = (client_id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT c.id, u.name, u.first_surname FROM users u, contacts c, clients cl WHERE c.client_id = cl.id AND c.user_id = u.id AND c.client_id = ?', [client_id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const getAllContacts = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT co.id, u.name, u.email, cl.business_name, co.is_active, co.created_at, ct.type FROM contacts co, clients cl, users u, contact_type ct WHERE co.user_id = u.id AND co.client_id = cl.id AND co.contact_type_id = ct.id', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const getAllContactsByID = (client_id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT co.id, u.name, u.first_surname, u.second_surname, u.email, cl.business_name, co.is_active, co.created_at, ct.type FROM contacts co, clients cl, users u, contact_type ct WHERE co.user_id = u.id AND co.client_id = cl.id AND co.contact_type_id = ct.id AND co.client_id = ?', [client_id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.query(
                ' DELETE FROM `contacts` WHERE `id` = ?  ', id,
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

const updateContacts = (client_id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('UPDATE contacts SET contact_type_id = 2 WHERE client_id = ?', [client_id], (err, rows) => {
            if (err) reject(err)
            resolve(true)
        })
    })
}

const updateContact = (id, telefono, creator_id, is_active, date, updated_reason) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('UPDATE contact SET ? WHERE id = ?',
            [{
                telefono,
                is_active,
                updated_by: creator_id,
                updated_at: date,
                updated_reason,
            }, id], async (err, rows) => {
                if (err) reject(err)
                resolve(true)
            })
    })
}

module.exports = {
    insertContact,
    getAllContacts,
    deleteById,
    updateContacts,
    getAllContactsByID,
    sendContactTypes,
    insertExtraContact,
    updateContact,
    sendClientsContacts
}