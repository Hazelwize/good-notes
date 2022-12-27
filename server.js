const express = require('express');
const app = express();
const passport = require('passport')
const methodOverride = require('method-override')
const connectDB = require('./config/database')
const session = require('express-session')
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/user')
// https://www.goodnotes.com/


//Use .env file from config folder
require('dotenv').config({path: './config/.env'})

//Static Folder
app.use(express.static("public"));

//Body Parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Method override
app.use(methodOverride("_method"))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes);
app.use('/user', userRoutes);
//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})
