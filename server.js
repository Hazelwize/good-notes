const express = require('express');
const app = express();
const passport = require('passport')
const methodOverride = require('method-override')
const {createClient} = require('@supabase/supabase-js')
const session = require('express-session')
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/user')
const noteRoutes = require('./routes/notes')

//Use .env file from config folder
require('dotenv').config({path: './config/.env'})

//Static Folder
app.use(express.static("public"));

//Body Parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
//Method override
app.use(methodOverride("_method"))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes);
app.use('/user', userRoutes);
app.use('/notes', noteRoutes);

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})
