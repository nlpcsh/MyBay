'use strict';

const passport = require('passport');
const User = require('../../models/user-model');

passport.use(User.createStrategy());

// session serialization
passport.serializeUser((user, done) => {
    if (user) {
        done(null, user.id);
    }
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then(user => done(null, user || false))
        .catch(error => done(error, false));
});

// attach passport middleware to app
module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
};
