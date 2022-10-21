// import { config } from "dotenv";
// config();
// import { createPool } from "mysql2/promise";
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const mysql = require('mysql')
const { promisify } = require('util');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// connection.connect((err) {
//     if (err) throw err;
//     console.log("Database connected!");
// });


module.exports = connection;