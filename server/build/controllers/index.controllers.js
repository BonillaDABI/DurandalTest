const mysql = require("mysql");

const controller = {}

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

//Controlador para registrar usuarios
controller.register = (req, res) => {

    const uName = req.body.user_name;
    const user_password = req.body.user_password;
    const first_name = req.body.first_name;
    const first_surname = req.body.first_surname;
    const second_surname = req.body.second_surname;
    const email = req.body.email;

    dbTest.query("INSERT INTO `users` (`name`, `first_surname`, `second_surname`, `email`, `password`) VALUES(?, ?, ?, ?, ?)",
        [first_name, first_surname, second_surname, email, user_password],
        (err, result) => {
            console.log(err);
        }
    );
};

//Controlador para ingresar a la cuenta
controller.login = (req, res) => {
    const first_name = req.body.first_name;
    const user_password = req.body.user_password;

    dbTest.query(
        "SELECT * FROM users WHERE  username = ? AND password = ?",
        [first_name, user_password],
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
};


module.exports = controller
