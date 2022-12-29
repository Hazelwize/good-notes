module.exports = {
    getIndex: (req,res) => {
        res.send('notes.html')
    },
    createNote: async(req,res) => {
        try{
            const { data, error } = await supabase
            .from('notes')
            .insert([{ user_id: req.user.id, msg: req.body.msg, likes: 0 },])
            res.json('Note Created')
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