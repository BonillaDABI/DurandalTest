if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const mysql = require('mysql')
const { promisify } = require('util');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Onfire77..",
    database: "login"
});
connection.connect((err) => {
    if (err) throw err;
    console.log("Database connected!");
});


module.exports = connection;