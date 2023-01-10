const express = require('express');
const app = express();
const passport = require('passport')
const methodOverride = require('method-override')
const session = require('express-session')
const sequelize = require('./config/database')
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/user')
const noteRoutes = require('./routes/notes')
const authRoutes = require('./routes/auth')

//Use .env file from config folder
require('dotenv').config({path: './config/.env'})

//Static Folder
app.use(express.static("public"));

//Body Parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
//Method override
app.use(methodOverride("_method"))

//Passport Middleware


app.use('/', homeRoutes);
app.use('/user', userRoutes);
app.use('/notes', noteRoutes);
app.use('/auth', authRoutes)

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})
