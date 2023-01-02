const supabase = require('@supabase/supabase-js')

module.exports = {
    login: async(req,res) => {
        console.log(req.body)
        try{
            const { user, session, error } = await supabase.auth.signIn({
                email: req.body.email,
                password: req.body.password,
            })
            console.log(user, session)
            res.redirect('index.html')
        }
        catch(err){
            console.log(err)
        }
    },
    logout: async(req,res) => {
        try{
            const { error } = await supabase.auth.signOut()
        }
        catch(err){
            console.log(err)
        }
    }

}