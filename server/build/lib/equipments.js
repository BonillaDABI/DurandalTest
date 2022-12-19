require('dotenv').config()
const connection = require('../config/database')

const getAllEquipments = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT eq.name, eq.description, eq.updated_at, eq.is_active, b.brand_name FROM equipments eq, brands b WHERE eq.brand_id = b.id', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const sendBrands = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, name FROM brands', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const insertEquipment = (name, description, brand_id, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO equipments SET ?', [{
            name,
            description,
            brand_id,
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

const insertEquipmentAttr = (name, description, dimensiones, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO equipment_attributes SET ?', [{
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

const insertEquipmentVal = (equipment_id, equipment_attributes_id, value, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO equipment_values SET ?', [{
            equipment_id,
            equipment_attributes_id,
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

module.exports = {
    getAllEquipments,
    insertEquipment,
    insertEquipmentAttr,
    insertEquipmentVal,
    sendBrands
}