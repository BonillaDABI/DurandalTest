require('dotenv').config()
const connection = require('../config/database')

const getAllEquipments = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT eq.id, eq.equip_name, eq.description, eq.updated_at, eq.is_active, b.brand_name FROM equipments eq, brands b WHERE eq.brand_id = b.id', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const sendBrands = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, brand_name FROM brands', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendEquipInfo = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT e.equip_name, e.description, e.is_active, b.brand_name FROM equipments e, brands b WHERE e.id = ? AND e.brand_id = b.id', [id], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows[0])))
        })
    })
}

const insertEquipment = (equip_name, description, brand_id, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO equipments SET ?', [{
            equip_name,
            description,
            brand_id,
            is_active: 01,
            created_by: creator_id,
            created_at: date,
            updated_at: date
        }], async (err, result) => {
            if (err) {
                reject(err)
            }
            const lastID = result.insertId;
            resolve(lastID)

            await connection.query('CALL log_crearEquipo(?, ?, ?, ?, ?, ?, ?, ?)', [lastID, brand_id, equip_name, description, 1, creator_id, date, 1])
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

const getEquipmentByID = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT e.equip_name, e.description, b.brand_name FROM equipments e, brands b WHERE e.id = ? AND e.brand_id = b.id', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const getEquipAttrs = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT ea.id, ea.name, ea.dimensiones, ev.value FROM equipment_attributes ea, equipment_values ev WHERE ev.equipment_id = ? AND ev.equipment_attributes_id = ea.id', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const updateEquipment = (id, equip_name, is_active, brand_id, description, creator_id, date, updated_reason) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('UPDATE equipments SET ? WHERE id = ?',
            [{
                equip_name,
                brand_id,
                is_active,
                description,
                updated_by: creator_id,
                updated_at: date,
                updated_reason,
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

const updateAttr = (id, name, is_active, description, dimensiones, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('UPDATE equipment_attributes SET ? WHERE id = ?',
            [{
                name,
                description,
                dimensiones,
                is_active,
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
                ' DELETE FROM `equipments` WHERE `id` = ?  ', id,
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

const deleteAttrById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.query(
                ' DELETE FROM `equipment_attributes` WHERE `id` = ?  ', id,
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

const getLogs = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT el.id, em.name, el.equip_name, el.description, b.brand_name, el.is_active, el.created_at, el.updated_at, el.updated_reason FROM equipments_logs el, brands b, equipment_movements em WHERE el.brand_id = b.id AND el.equip_movements_id = em.id AND el.id = ?', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

module.exports = {
    getAllEquipments,
    insertEquipment,
    insertEquipmentAttr,
    insertEquipmentVal,
    sendBrands,
    deleteById,
    deleteAttrById,
    getLogs,
    getEquipAttrs,
    getEquipmentByID,
    updateEquipment,
    updateAttr,
    sendEquipInfo
}