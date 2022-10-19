const connection = require('../config/database')

const controller = {}


//Controlador para registrar usuarios
controller.register = async (req, res) => {

    const { name, first_surname, second_surname, email, password } = req.body;

    connection.query("INSERT INTO `users` SET ?", [{
        name,
        first_surname,
        second_surname,
        email,
        password
    }],
        (err, result) => {
            console.log(err);
        }
    )
};

//Controlador para ingresar a la cuenta
controller.login = async (req, res) => {
    const { email, password } = req.body;

    connection.query(
        "SELECT * FROM `users` WHERE `email` = ? AND `password` = ?",
        [email, password],
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

//Controlador para update
controller.update = async (req, res) => {
    
    const { name, first_surname, second_surname, email, password} = req.body;

    connection.query("UPDATE users SET second_surname = ?, email = ?, password = ? WHERE name = ? AND first_surname = ?", [{
        second_surname,
        email,
        password,
        name,
        first_surname
    }],
        (err, result) => {
            console.log(err);
        }
    )
}


module.exports = controller
