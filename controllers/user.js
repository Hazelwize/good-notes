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
    getProfile: (req,res) => {
        console.log(req.user)
    },
    getUsers: async(req,res) => {
        try{
            console.log(req)
            const data = await User.findAll()
            res.json(data)
        }
        catch(err){
            console.log(err)
        }
    },
    createUser: async(req,res) => {
        try{
            console.log(req.body)
            const user = await User.create({
                username: req.body.name,
                email: req.body.email,
                password: req.body.pass,
            })
            res.json(user)
        }
        catch(err){
            console.log(err)
        }
    }


}