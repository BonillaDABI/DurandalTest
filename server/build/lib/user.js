require('dotenv').config()
const connection = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const moment = require('moment')
const Users = require('../models/Users')

const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        const user = await getUserByEmail(email);
        if (user) {
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${email}" doesn't exist`);
        }
    });
};


let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `users` WHERE `id` = ?  ', id,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

const getAll = () => {
    return new Promise((resolve, reject) => {
        connection.query('Select * FROM users', (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        });
    });
};

// const checkUser = (req, res, next) => {
//     const token = req.cookies.jwt;

//     if (token) {
//         jwt.verify(token, 'jwtsecret', async (err, decodedToken) => {
//             if (err) {
//                 console.log('Error')
//                 next();
//             } else {
//                 console.log(decodedToken)
//                 const user = await Users.getUserByEmail(decodedToken.email)
//                 return user.id;
//             }
//         })
//     } else {
//         next()
//     }
// }

// const jwtVerify = (token, key) => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, key, (err, data) => {
//             if (err) return reject(err);
//             return resolve(data);
//         })
//     });
// }

const userRegister = async (name, first_surname, second_surname, email, password) => {

    new_password = await bcrypt.hashSync(password, 10)

    connection.query(
        "SELECT * FROM `users` WHERE `email` = ?",
        [email],
        (err, result) => {
            if (err) {
                return err;
            } else {
                // console.log(result)
                if (result.length <= 0) {
                    console.log(new_password)
                    return connection.query("INSERT INTO `users` SET ?", [{
                        name,
                        first_surname,
                        second_surname,
                        email,
                        password: new_password
                    }]
                    )
                } else {
                    return console.log("Mail en uso");
                }
            }
        }
    )
}

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
            if (err) {reject(err)}
            resolve(rows[0])
        })
    })
}

const comparePassword = (password, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(password, userObject.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`The password that you've entered is incorrect`);
                }
            });
        } catch (e) {
            reject(e)
        }
    })
}

const createToken = (user) => {
    let payload = {
        userID: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    }

    return jwt.encode(payload, process.env.TOKEN_KEY);
}

exports.userRegister = userRegister;
exports.getAll = getAll;
exports.getUserByEmail = getUserByEmail;
exports.createToken = createToken;
exports.comparePassword = comparePassword;
exports.findUserById = findUserById;
exports.handleLogin = handleLogin;

// exports.jwtVerify = jwtVerify;