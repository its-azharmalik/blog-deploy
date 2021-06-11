const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const colors = require('colors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session)
const multer = require('multer');
const cloudinary = require('cloudinary');
const { connectDB } = require('./config/db');
const {ensureAuth , ensureGuest } = require('./Auth/auth.config')
const ejs = require('ejs');
const path = require('path');



dotenv.config({path : '.env'});

require('./config/passport')(passport)

const PORT  = process.env.PORT || 3000 ;

connectDB() ;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'))

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'))
}
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret : 'keyboard',
    resave : false,
    saveUninitialized : false,
    // store : new MongoStore({ mongooseConnection: mongoose.connection }),
}))
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.get('/' , ensureGuest ,(req,res)=>{
    res.render('index');
})
app.get('/dashboard' , ensureAuth ,(req,res)=>{
    res.send('dashboard you are logged in!');
})
app.use('/auth' , require('./Auth/auth.routes'))
app.use('/profile' , require('./Profile/profile.routes'))
app.use('/blog' , require('./Blog/blog.routes'))

app.listen( PORT , () =>{
    console.log(`app running on port ${PORT.yellow.bold} on ${process.env.NODE_ENV.blue.bold} mode `);
})

