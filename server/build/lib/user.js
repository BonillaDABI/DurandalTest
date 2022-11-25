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


let findUserById = (name) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `users` WHERE `name` = ?  ', id,
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

const deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.query(
                ' DELETE FROM `users` WHERE `id` = ?  ', id,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(true);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};


const getAll = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('Select id, name, email, is_active, created_at FROM users ', (err, rows) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
        });
    });
};

const getRoleById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM roles WHERE id = ?', [id], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows[0])
        })
    })
}
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
            if (err) { reject(err) }
            resolve(rows[0])
        })
    })
}

const getUserByPasswordToken = (token) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE passwordResetToken = ?', [token], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows[0])
        })
    })
}

const getPermissionByRoleId = (role_id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT p.id FROM roles r, permissions p, permissions_roles pr WHERE ? = r.id AND r.id = pr.role_id AND pr.permissions_id = p.id', [role_id], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.stringify(rows))
        })
    })
}

const getAllPermissions = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, per_name FROM permissions', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const getAllPermissionsFromUser = (role_id, id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT p.id, per_name FROM roles r, permissions p, permissions_roles pr WHERE ? = r.id AND r.id = pr.role_id AND pr.permissions_id = p.id UNION SELECT p.id, per_name FROM permissions p, permissions_user pu WHERE ? = pu.user_id AND pu.permissions_id = p.id', [role_id, id], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const getModuleById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT m.name FROM permissions p, modules m WHERE p.id = ? AND p.module_id = m.id', [id], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows)
        })
    })
}

const getFunctionById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT f.name FROM permissions p, functions f WHERE p.id = ? AND p.functions_id = f.id', [id], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows)
        })
    })
}

const sendAllPermissionsNames = (role_id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT p.id, m.name, f.name FROM roles r, permissions p, permissions_roles pr, modules m, functions f WHERE ? = r.id AND r.id = pr.role_id AND pr.id = p.id AND p.module_id = m.id AND p.functions_id = f.id', [role_id], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const getExtraPermissions = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT p.id FROM permissions p, permissions_user pu WHERE ? = pu.user_id AND pu.permissions_id = p.id', [id], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.stringify(rows))
        })
    })
}

const addPermissions = (user_id, permissions_id, id) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('DELETE FROM permissions_user WHERE ? = user_id', [user_id], (err, rows) => {
            if (err) {
                reject(err)
            }
        })
        permissions_id.forEach(async permissions_id => {
            const permissions = [id, permissions_id, user_id]
            console.log(permissions)
            await connection.query('INSERT INTO permissions_user(id, permissions_id, user_id) VALUES (?)', [permissions], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(JSON.stringify(rows))
            })
        })
    })
}

const getUserRoleID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT roles_id FROM users u WHERE ? = u.id', [id], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows[0].roles_id)
        })
    })
}

const getRoles = () => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT id, role_name FROM roles WHERE role_name NOT IN("Client", "Technical")', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const createRoles = (id, role_name) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO roles SET ?', [{
            id,
            role_name
        }], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve("Rol creado exitosamente.")
        })
    })
}

const updateRoles = (id, role_name) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('UPDATE roles SET ? WHERE id = ?', [{ role_name }, id], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve("Rol actualizado exitosamente.")
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

module.exports = {
    userRegister,
    getAll,
    getUserByEmail,
    createToken,
    comparePassword,
    findUserById,
    handleLogin,
    deleteById,
    getUserRoleID,
    getAllPermissions,
    getExtraPermissions,
    sendAllPermissionsNames,
    addPermissions,
    updateRoles,
    createRoles,
    getRoles,
    getRoleById,
    getModuleById,
    getFunctionById,
    getPermissionByRoleId,
    getUserByPasswordToken,
    getAllPermissionsFromUser
}