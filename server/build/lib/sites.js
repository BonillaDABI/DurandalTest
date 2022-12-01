require('dotenv').config()
const connection = require('../config/database')

const getAllSites = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT s.id, s.name, s.address_street, s.address_number, s.address_postal_code, s.is_active, cl.business_name, co.name, st.name, ci.name, col.name FROM sites s, clients cl, colony col, city ci, state st, country co WHERE s.client_id = cl.id AND s.address_country_id = co.id AND s.address_state_id = st.id AND s.address_city_id = ci.id AND s.address_colony_id = col.id', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const insertSite = (client_id, name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO sites SET ?', [{
            client_id,
            name,
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
        }], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const getSitesByClientID = (client_id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT s.id, s.name, s.address_street, s.address_number, s.address_postal_code, s.is_active, cl.business_name, co.name, st.name, ci.name, col.name FROM sites s, clients cl, colony col, city ci, state st, country co WHERE ? = cl.id AND s.address_country_id = co.id AND s.address_state_id = st.id AND s.address_city_id = ci.id AND s.address_colony_id = col.id', [client_id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const getSitesByID = (id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT s.id, s.name, s.address_street, s.address_number, s.address_postal_code, s.is_active, cl.business_name, co.name, st.name, ci.name, col.name FROM sites s, clients cl, colony col, city ci, state st, country co WHERE s.client_id = cl.id AND s.address_country_id = co.id AND s.address_state_id = st.id AND s.address_city_id = ci.id AND s.address_colony_id = col.id AND s.id = ?', [id], (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const updateSiteByID = (id, name, address_street, address_number, address_colony_id, address_city_id, address_state_id, address_country_id, address_postal_code, creator_id, date) => {
    return new Promise(async (resolve, reject) => {
        await connection.query(
            "UPDATE sites SET ? WHERE id = ?",
            [{
                name,
                address_street,
                address_number,
                address_colony_id,
                address_city_id,
                address_state_id,
                address_country_id,
                address_postal_code,
                updated_by: creator_id,
                updated_at: date
            }, id], (err, rows) => {
                if (err) reject(err)
                resolve(true)
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

module.exports = {
    getAllSites,
    insertSite,
    getSitesByClientID,
    getSitesByID,
    updateSiteByID,
    deleteById
}