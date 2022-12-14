require('dotenv').config()
const connection = require('../config/database')

const getAllSites = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT s.id, s.site_name, s.address_street, s.address_number, s.address_postal_code, s.is_active, cl.business_name, co.name, st.name, ci.name, col.name, s.created_at FROM sites s, clients cl, colony col, city ci, state st, country co WHERE s.client_id = cl.id AND s.address_country_id = co.id AND s.address_state_id = st.id AND s.address_city_id = ci.id AND s.address_colony_id = col.id', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const insertSite = (client_id, site_name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO sites SET ?', [{
            client_id,
            site_name,
            address_street,
            address_number,
            address_colony_id,
            address_city_id,
            address_state_id,
            address_country_id,
            address_postal_code,
            is_active: 01,
            created_by: creator_id,
            created_at: date,
            updated_at: date
        }], async (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)

            await connection.query('CALL log_crearSitio(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [rows.insertId, client_id, 2, site_name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, 1, creator_id, date])
        })
    })
}

const getSitesByClientID = (client_id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT s.id, s.site_name, s.address_street, s.address_number, s.address_postal_code, s.is_active, cl.business_name, co.name, st.name, ci.name, col.name, s.created_at FROM sites s, clients cl, colony col, city ci, state st, country co WHERE s.address_country_id = co.id AND s.address_state_id = st.id AND s.address_city_id = ci.id AND s.address_colony_id = col.id AND s.client_id = cl.id AND s.client_id = ?', [client_id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const getSitesByID = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT s.id, s.site_name, s.address_street, s.address_number, s.address_postal_code, s.is_active, cl.business_name, co.co_name, st.st_name, ci.ci_name, col.col_name, s.created_at, s.is_active FROM sites s, clients cl, colony col, city ci, state st, country co WHERE s.client_id = cl.id AND s.address_country_id = co.id AND s.address_state_id = st.id AND s.address_city_id = ci.id AND s.address_colony_id = col.id AND s.id = ?', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const getClientIdFromSite = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT client_id FROM sites WHERE id = ?', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows[0].client_id)))
        })
    })
}

const updateSiteByID = (id, client_id, site_name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, creator_id, date, is_active, updated_reason) => {
    return new Promise(async (resolve, reject) => {
        await connection.query(
            "UPDATE sites SET ? WHERE id = ?",
            [{
                site_name,
                address_street,
                address_number,
                address_colony_id,
                address_city_id,
                address_state_id,
                address_country_id,
                address_postal_code,
                updated_by: creator_id,
                updated_at: date,
                is_active,
                updated_reason
            }, id], async (err, rows) => {
                if (err) reject(err)
                resolve(true)

                // if (is_active === 1) {
                //     await connection.query('CALL log_actualizarSitio(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, client_id, 3, site_name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, 1, creator_id, date, updated_reason])
                // } else {
                //     await connection.query('CALL log_actualizarSitio(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, client_id, 1, site_name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, is_active, creator_id, date, updated_reason])
                // }

            })
    })
}

const getSitesAssets = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT a.id, a.asset_name, a.description, e.equip_name, aas.aas_name, a.is_active FROM asset a, equipments e, asset_active_statuses aas WHERE a.site_id = 1 AND a.equipment_id = e.id AND a.asset_active_status_id = aas.id', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.query(
                ' DELETE FROM `sites` WHERE `id` = ?  ', id,
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
        await connection.query('SELECT st.id, sm.mov_name, st.site_name, st.address_street, st.address_number, col.name, c.name, s.name, cou.name, st.address_postal_code, st.is_active, st.created_at, st.updated_at, st.updated_reason, cl.business_name, cl.rfc, s.name FROM sites_logs st, sites_movements sm, clients cl, city c, state s, colony col, country cou WHERE st.site_movement_id = sm.id AND st.client_id = cl.id AND st.address_colony_id = col.id AND st.address_city_id = c.id AND st.address_state_id = s.id AND st.address_country_id = cou.id AND st.site_id = ?', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendCountryDetails = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, name FROM country', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendStateDetails = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, name, country_id FROM state', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendCityDetails = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, name, state_id FROM city', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

const sendColonyDetails = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, name, city_id FROM colony', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(rows)))
        })
    })
}

module.exports = {
    getAllSites,
    insertSite,
    getSitesByClientID,
    getSitesByID,
    updateSiteByID,
    deleteById,
    getLogs,
    sendCountryDetails,
    sendStateDetails,
    sendCityDetails,
    sendColonyDetails,
    getClientIdFromSite,
    getSitesAssets
}