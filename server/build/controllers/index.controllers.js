const pool = require('../database')

const controller = {}


//Controlador para registrar usuarios
controller.register = (req, res) => {

    const user_password = req.body.user_password;
    const first_name = req.body.first_name;
    const first_surname = req.body.first_surname;
    const second_surname = req.body.second_surname;
    const email = req.body.email;

    pool.query("INSERT INTO `users` (`name`, `first_surname`, `second_surname`, `email`, `password`) VALUES(?, ?, ?, ?, ?)",
        [first_name, first_surname, second_surname, email, user_password],
        (err, result) => {
            console.log(err);
        }
    )
};

//Controlador para ingresar a la cuenta
controller.login = (req, res) => {
    const email = req.body.email;
    const user_password = req.body.user_password;

    pool.query(
        "SELECT * FROM `users` WHERE `email` = ? AND `password` = ?",
        [email, user_password],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (result.length > 0) {
                    res.status(200).send(result[0])
                } else {
                    res.status(400).send('Combinacion de correo y contrasena equivocada.')
                }
            }
        }
    )
};


module.exports = controller
