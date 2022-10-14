const mysql = require('mysql');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Se ha cerrado la conexion.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Existen demasiadas conexiones.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexion Rechazada.');
        }
    }

    if (connection) connection.release();
    console.log('Se logro la conexion a la Base de Datos.');

    return;
});

module.exports = pool