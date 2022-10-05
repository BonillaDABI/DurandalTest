const express = require("express");
const mysql = require("mysql")

const app = express();

app.use(express.json());

const dbTest = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Onfire77..",
    database: "LoginSystem",
});

app.listen(4000, () => {
    console.log("Running");
});