require('dotenv').config()
const connection = require('../config/database')

const getAllItems = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT i.id, i.name, i.description, i.is_active, i.updated_at, u.unit_name, i.cost, c.currency_name FROM items i, currencies c, units u WHERE i.currency_id = c.id AND i.unit_id = u.id', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const sendUnits = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, unit_name FROM units', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendCurrency = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, currency_name FROM currencies', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const insertItem = (name, description, cost, unit_id, currency_id, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO items SET ?', [{
            name,
            description,
            cost,
            unit_id,
            currency_id,
            is_active: 01,
            created_by: creator_id,
            created_at: date,
            updated_at: date
        }], (err, result) => {
            if (err) {
                reject(err)
            }
            const lastID = result.insertId;
            resolve(lastID)
        })
    })
}

const insertItemAttr = (name, description, dimensiones, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO item_attributes SET ?', [{
            name,
            description,
            dimensiones,
            is_active: 01,
            created_by: creator_id,
            created_at: date,
            updated_at: date
        }], (err, result) => {
            if (err) {
                reject(err)
            }
            const lastID = result.insertId;
            resolve(lastID)
        })
    })
}

const insertItemVal = (item_id, item_attributes_id, value, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO item_values SET ?', [{
            item_id,
            item_attributes_id,
            value,
            is_active: 01,
            created_by: creator_id,
            created_at: date,
            updated_at: date
        }], (err, result) => {
            if (err) {
                reject(err)
            }
            const lastID = result.insertId;
            resolve(lastID)
        })
    })
}

const updateItem = (id, name, is_active, description, cost, unit_id, currency_id, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('UPDATE items SET ? WHERE id = ?',
            [{
                name,
                description,
                is_active,
                cost,
                unit_id,
                currency_id,
                updated_by: creator_id,
                updated_at: date,
                //updated_reason,
            }, id], async (err, rows) => {
                if (err) reject(err)
                resolve(true)

                // if (is_active === '1') {
                //     await connection.query('CALL log_actualizarTecnico(?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, user_id, 3, telefono, fechaNacimiento, 1, creator_id, date, updated_reason])
                // } else {
                //     await connection.query('CALL log_actualizarTecnico(?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, user_id, 1, telefono, fechaNacimiento, is_active, creator_id, date, updated_reason])
                // }
            })
    })
}

const deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.query(
                ' DELETE FROM `items` WHERE `id` = ?  ', id,
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
    getAllItems,
    insertItem,
    insertItemAttr,
    insertItemVal,
    sendUnits,
    sendCurrency,
    deleteById,
    updateItem
}