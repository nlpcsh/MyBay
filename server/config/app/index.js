'use strict';

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// View Engine Setup 
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

// app middlewares for session
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

// DB connect
mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

mongoose.set('useCreateIndex', true);
///

require('../passport/')(app);

// sets if user logged to a local var
app.use(function (req, res, next) {
    res.locals.logggedIn = req.isAuthenticated();
    next();
});

require('../../routers')(app); // loading all routers from the folder

module.exports = app;
