module.exports = {
    get: function (con, callback) {
        con.query("SELECT * FROM users", callback)
    },

    getByEmail: function (con, email, callback) {
        con.query(`SELECT * FROM biodata WHERE email = ${email}`, callback)
    },

    create: function (con, data, callback) {
        con.query(
            `INSERT INTO users SET 
        name = '${data.name}', 
        first_surname = '${data.first_surname}',
        second_surname = '${data.second_surname}',
        email = '${data.email}',
        password = '${data.password}',
        is_active = '${1}',
        created_by = '${01}',
        updated_by = '${01}',
        created_at = '${Date.now()}',
        updated_at = '${Date.now()}`,
            callback
        )
    },

    update: function (con, data, id, callback) {
        con.query(
            `UPDATE biodata SET 
        nama = '${data.nama}', 
        alamat = '${data.alamat}' 
        WHERE id_biodata = ${id}`,
            callback
        )
    },

    destroy: function (con, id, callback) {
        con.query(`DELETE FROM biodata WHERE id_biodata = ${id}`, callback)
    }
}