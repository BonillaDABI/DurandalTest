const express = require("express");
const mysql = require("mysql")

const app = express();
const port = process.env.PORT;

app.use(express.json());

require('dotenv').config()

console.log("Host: " + process.env.HOST);

/*
const dbTest = mysql.createPool({
    connectionLimit: 10,
    user: db_User,
    host: db_host,
    password: db_password,
    database: db_database,
    port: db_port
});*/

dbTest.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("Database connected succesful: " + connection.threadId);
});

app.listen(port,
    () => console.log(`Server startated on port ${port}...`));