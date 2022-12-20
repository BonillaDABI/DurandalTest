require('dotenv').config()
const connection = require('../config/database')

const getVisits = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT v.visit_name, v.description, v.is_active, v.updated_at, vt.vt_name, s.name, u.name FROM visits v, visit_types vt, sites s, technicals t, users u WHERE v.visit_type_id = vt.id AND v.site_id = s.id AND v.technical_id = t.id AND t.user_id = u.id', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const sendSites = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, name FROM sites', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendVisitTypes = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, name FROM visit_types', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendTechnicals = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT t.id, u.name, u.first_surname, u.second_surname FROM technicals t, users u WHERE t.user_id = u.id', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}


const insertVisit = (visit_type_id, site_id, technical_id, visit_name, description, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO equipments SET ?', [{
            visit_type_id,
            site_id,
            technical_id,
            visit_name,
            description,
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

            await connection.query('CALL log_crearAsset(?, ?, ?, ?, ?, ?, ?, ?)', [name, description, site_id, lastID, 1, 1, creator_id, date])
        })
    })
}

const updateAsset = (id, asset_name, description, site_id, equipment_id, asset_active_status_id, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('UPDATE assets SET ? WHERE id = ?',
            [{
                asset_name,
                description,
                is_active,
                site_id,
                equipment_id,
                asset_active_status_id,
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

const deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.query(
                ' DELETE FROM `asset` WHERE `id` = ?  ', id,
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
        await connection.query('SELECT al.id, al.asset_log_name, al.description, am.asset_mov_name, s.name, al.is_active, al.created_at, al.updated_at, al.updated_reason FROM asset_logs al, asset_movements am, sites s WHERE al.asset_movement_id = am.id AND al.site_id = s.id AND al.asset_id = ?', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

module.exports = {
    getAssets,
    getLogs,
    deleteById,
    insertAsset,
    sendSites,
    sendEquipments,
    updateAsset,
    sendAssetsStatus
}