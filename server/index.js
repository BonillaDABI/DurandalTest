const express = require("express");
const mysql = require("mysql")

const app = express();
const port = process.env.PORT;

app.use(express.json());

require("dotenv").config();

const db_Host = process.env.db_host;
const db_User = process.env.db_user;
const db_Password = process.env.db_password;
const db_Database = process.env.db_database;
const db_Port = process.env.db_port;

const dbTest = mysql.createPool({
    connectionLimit: 10,
    user: db_User,
    host: db_Host,
    password: db_Password,
    database: db_Database,
    port: db_Port
});

dbTest.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("Database connected succesful: " + connection.threadId);
});

app.listen(port,
    () => console.log(`Server startated on port ${port}...`));