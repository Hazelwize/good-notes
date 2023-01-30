const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');

module.exports = {
    createUser: async (name, email, password) => {
        console.log('creating user account')
        const id = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt); 
        const data = await pool.query(
        "INSERT INTO users(id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, password",
        [id, name ,email, hash]
        );
        console.log(data)
        if (data.rowCount == 0) return false;
        return data.rows[0];
    },
    emailExists: async (email) => {
        console.log('checking email')
        const data = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        console.log(data)
        if (data.rowCount == 0) return false; 
        return data.rows[0];
    },
    matchPassword: async (password, hashPassword) => {
        const match = await bcrypt.compare(password, hashPassword);
        return match
    },
    findUser: async (email) => {
        try{
            let data = await pool.query('SELECT id, name, email, password FROM users WHERE email = $1', [email])
            return ['' , data.rows[0]]
        }
        catch(err){
            return [err, '']
        }
    }
}