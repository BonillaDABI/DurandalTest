import { config } from "dotenv";
config();
import { createPool } from "mysql2/promise";
// const mysql = require('mysql2')

export const connection = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// connection(function (err) {
//     if (err) throw err;
//     console.log("Database connected!");
