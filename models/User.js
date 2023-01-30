const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');


const emailExists = async (email) => {
    const data = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (data.rowCount == 0) return false; 
    return data.rows[0];
};

module.exports = {
    createUser: async (name, email, password) => {
        console.log('creating user account')
        const emailCheck = await emailExists(email)
        if(emailCheck){
            throw new Error("This email exists!")
        }
        const id = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt); 
        const data = await pool.query(
        "INSERT INTO users(id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, password",
        [id, name ,email, hash]
        );
        console.log(data)
        if (data.rowCount == 0) return false;
        return ['', data.rows[0]]
    },
    matchPassword: async (password, hashPassword) => {
        const match = await bcrypt.compare(password, hashPassword);
        return match
    },
    updatePassword: async(email, password, newPass, newPassConfirm) => {
        try{
            const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
            console.log(user.rows[0])
            const match = await bcrypt.compare(password, user.rows[0].password);
            if(match && newPass === newPassConfirm){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newPass, salt);
                const data = await pool.query("UPDATE users SET password = $1 WHERE id = $2 RETURNING id, name, email, password", [hash, user.rows[0].id])
                console.log(data.rows[0])
                return ['', data.rows[0]]
            }else{
                throw new Error('Password was incorrect!')
            }  
        }
        catch(err){
            return [err, '']
        }

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