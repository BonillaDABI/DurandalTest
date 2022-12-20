require('dotenv').config()
const connection = require('../config/database')

const getVisits = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT v.id, v.visit_name, v.description, v.is_active, v.updated_at, vt.vt_name, s.site_name, u.name FROM visits v, visit_types vt, sites s, technicals t, users u WHERE v.visit_type_id = vt.id AND v.site_id = s.id AND v.technical_id = t.id AND t.user_id = u.id', (err, rows) => {
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

const sendVisitTypes = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, vt_name FROM visit_types', (err, rows) => {
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
        await connection.query('INSERT INTO visits SET ?', [{
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

            await connection.query('CALL log_crearVisit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [lastID, 1, visit_type_id, site_id, technical_id, visit_name, description, 1, creator_id, date])
        })
    })
}

const updateVisit = (id, visit_type_id, site_id, technical_id, visit_name, description, is_active, creator_id, date, updated_reason) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('UPDATE visits SET ? WHERE id = ?',
            [{
                visit_type_id,
                site_id,
                technical_id,
                visit_name,
                description,
                is_active,
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
                ' DELETE FROM `visits` WHERE `id` = ?  ', id,
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
        await connection.query('SELECT vl.id, vl.visit_name, s.site_name, u.name, vl.description, vl.is_active, vl.updated_at, vl.updated_reason, vm.visit_mov_name FROM visit_movements vm, visit_logs vl, sites s, technicals t, users u WHERE vl.id = ? AND vl.site_id = s.id AND vl.technical_id = t.id AND t.user_id = u.id AND vl.visit_movement_id = vm.id', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

module.exports = {
    getVisits,
    getLogs,
    deleteById,
    insertVisit,
    sendSites,
    sendTechnicals,
    sendVisitTypes,
    updateVisit
}