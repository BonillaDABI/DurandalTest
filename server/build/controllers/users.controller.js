// import { connection } from "../config/database.js";

// //Controlador para listAll
// export const getUsers = async (req, res) => {

//     await connection.query("SELECT * FROM users",
//         (err, result) => {
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 if (result.length > 0) {
//                     res.status(200).send(result)
//                     console.log(result)
//                 } else {
//                     res.status(400).send('Combinacion de correo y contrasena equivocada.')
//                 }
//             }
//         })

// };

// //Controlador para Login
// export const login = async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email);
//     console.log(password);

//     await connection.query(
//         "SELECT * FROM `users` WHERE `email` = ? AND `password` = ?",
//         [email, password],
//         (err, result) => {
//             if (err) {
//                 res.status(500).send(err);
//                 console.log(err);
//             } else {
//                 if (result.length > 0) {
//                     res.status(200).send(result[0])
//                     console.log(result[0])
//                 } else {
//                     res.status(400).send('Combinacion de correo y contrasena equivocada')
//                     console.log("critical error");
//                 }
//             }
//         }
//     )
//     console.log(connection);
// }

// //Controlador register
// export const createUser = async (req, res) => {
//     const { name, first_surname, second_surname, email, password } = req.body;

//     await connection.query("INSERT INTO `users` SET ?", [{
//         name,
//         first_surname,
//         second_surname,
//         email,
//         password
//     }],
//         (err, result) => {
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 if (result.length > 0) {
//                     res.status(200).send(result[0])
//                     console.log(result)
//                 }
//             }
//         }
//     )
// };

// //Controlador update
// export const updateUser = async (req, res) => {
//     const { name } = req.body;
//     const { first_surname, second_surname, email, password } = req.body;

//     await connection.query(
//         "UPDATE users SET first_surname = IFNULL(?, first_surname), second_surname = IFNULL(?, second_surname), email = IFNULL(?, email), password = IFNULL(?, password) WHERE name = ?;",
//         [first_surname, second_surname, email, password, name],
//         (err, result) => {
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 if (result.length > 0) {
//                     res.status(200).send(result[0])
//                     console.log(result)
//                 }
//             }
//         }
//     );

// };