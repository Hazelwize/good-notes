const express = require('express');
const app = express();
const passport = require('passport')
const methodOverride = require('method-override')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/user')
const noteRoutes = require('./routes/notes')
const authRoutes = require('./routes/auth')
const pool = require('./config/database')

//Use .env file from config folder
require('dotenv').config({path: './config/.env'})

//Static Folder
app.use(express.static("public"));

//Body Parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//Method override
app.use(methodOverride("_method"))
//SESSIONS
app.use(session({
    store: new pgSession({
      pool: pool,
      tableName: 'user_sessions'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    // Insert express-session options here
  }));

//PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

//ROUTES
app.use('/', homeRoutes);
app.use('/user', userRoutes);
app.use('/notes', noteRoutes);
app.use('/auth', authRoutes)

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})
