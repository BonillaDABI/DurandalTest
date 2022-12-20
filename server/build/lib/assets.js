require('dotenv').config()
const connection = require('../config/database')

const getAssets = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT a.id, a.asset_name, s.site_name, eq.equip_name, a.is_active, a.updated_at, aas.aas_name FROM asset a, asset_active_statuses aas, sites s, equipments eq WHERE a.site_id = s.id AND a.equipment_id = eq.id AND a.asset_active_status_id = aas.id', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const sendSites = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, site_name FROM sites', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendEquipments = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, equip_name FROM equipments', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendAssetsStatus = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, aas_name FROM asset_active_statuses', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const insertAsset = (asset_name, description, site_id, equipment_id, asset_active_status_id, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO asset SET ?', [{
            asset_name,
            description,
            site_id,
            equipment_id,
            asset_active_status_id,
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

            await connection.query('CALL log_crearAsset(?, ?, ?, ?, ?, ?, ?, ?)', [asset_name, description, site_id, lastID, 1, 1, creator_id, date])
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
        await connection.query('SELECT al.id, al.asset_name, al.description, am.asset_mov_name, s.site_name, al.is_active, al.created_at, al.updated_at, al.updated_reason FROM asset_logs al, asset_movements am, sites s WHERE al.asset_movement_id = am.id AND al.site_id = s.id AND al.asset_id = ?', [id], (err, rows) => {
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