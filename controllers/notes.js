const pool = require('../config/database')

module.exports = {
    getIndex: (req,res) => {
        res.send('notes.html')
    },
    createNote: async(req,res) => {
        try{
            const msg = await pool.query('INSERT INTO notes (message) VALUES ($1) RETURNING *',[req.body.msg])
            console.log(msg.rows)
            res.redirect('/')
        }
        catch(err){
            console.log(err)
            res.json('Something went wrong...')
        }
        
    },
    getNote: async(req,res) => {
        try{
            let { data: notes, error } = await supabase
            .from('notes')
            .select('user_id, msg, likes')
            .order(random())
            .limit(1)
            .single()
            res.json(data)
        }
        catch(err){

        }
    }
}