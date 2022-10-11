const express = require("express");
const mysql = require("mysql")

const app = express();
const port = process.env.PORT;

app.use(express.json());

require('dotenv').config()


const dbTest = mysql.createPool({
    connectionLimit: 10,
    user: "root",
    host: "localhost",
    password: "Onfire77..",
    database: "login",
    port: "3306"
});

dbTest.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("Database connected succesful: " + connection.threadId);
});

app.post("/register", (req, res) => {

    const uName = req.body.user_name;
    const user_password = req.body.user_password;
    const first_surname = req.body.first_surname;
    const second_surname = req.body.second_surname;
    const email = req.body.email;

    dbTest.query("INSERT INTO users (name, first_surname, second_surname, email, password) VALUES(?, ?, ?, ?, ?)",
        [uName, first_surname, second_surname, email, user_password],
        (err, result) => {
            console.log(err);
        }
    );
});


app.post("/login", (req, res) => {
    const uName = req.body.user_name;
    const user_password = req.body.user_password;

    dbTest.query(
        "SELECT * FROM users WHERE  username = ? AND password = ?",
        [uName, user_password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Combinacion de usario y contraseña equivocada." });
            }
        }
    );
});

app.listen(port,
    () => console.log(`Server startated on port ` + port));