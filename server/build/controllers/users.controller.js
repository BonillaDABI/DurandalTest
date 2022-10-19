import { connection } from "../config/database.js";

export const getUsers = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM employee");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const login = async (req, res) => {
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
}


export const createUser = async (req, res) => {
    const { name, first_surname, second_surname, email, password } = req.body;

    connection.query("INSERT INTO `users` SET ?", [{
        name,
        first_surname,
        second_surname,
        email,
        password
    }],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (result.length > 0) {
                    res.status(200).send(result[0])
                    con
                }
            }
        }
    )
};

export const updateUser = async (req, res) => {
    try {
        const { name } = req.body;
        const { first_surname, second_surname, email, password } = req.body;

        const [result] = await pool.query(
            "UPDATE employee SET first_surname = IFNULL(?, first_surname), second_surname = IFNULL(?, second_surname), email = IFNULL(?, email), password = IFNULL(?, password), WHERE name = ?",
            [first_surname, second_surname, email, password, name]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Employee not found" });

        const [rows] = await pool.query("SELECT * FROM employee WHERE name = ?", [
            name,
        ]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};