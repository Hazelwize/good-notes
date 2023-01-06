const express = require('express');
const app = express();
const passport = require('passport')
const methodOverride = require('method-override')
const session = require('express-session')
const sequelize = require('./config/database')
const { Sequelize } = require('sequelize');
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

// /**
// * Make a request from the client to your server function
// */
// async function makeApiRequest() {
//     const token = newClient.session()?.access_token
  
//     await fetch('https://example.com/withAuth', {
//        method: 'GET',
//        withCredentials: true,
//        credentials: 'include',
//        headers: {
//         'Content-Type': 'application/json',
//         'Authorization': bearer, // Your own auth
//         'X-Supabase-Auth': token, // Set the Supabase user
//        }
//     })
//   }
  
//   /**
//   * Use the Auth token in your server-side function.
//   */
//   async function apiFunction(req, res) {
//     const { access_token } = req.get('X-Supabase-Auth')
  
//     // You can now use it within a Supabase Client
//     const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
//     const { user, error } = supabase.auth.setAuth(access_token)
  
//     // This client will now send request as this user
//     const { data } = await supabase.from('users').select()
//   }
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
