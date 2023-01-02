const pool = require('../config/queries')

module.exports = {
    getNote: (req,res) => {
        res.send('index.html')
    },
    newNote: (req, res) => {
        res.send('index.html')
    },
    createNote: (req,res) => {
        res.send('index.html')
    },
    getUsers: (req,res) => {
        pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
    }
}