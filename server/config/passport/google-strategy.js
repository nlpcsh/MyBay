'use strict';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/user-model');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
const gAuthStrategy = new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/mybay',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
}, function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
        username: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        googleId: profile.id
    }, function (err, user) {
        return done(err, user);
    });
});
///////////

module.exports = passport => passport.use(gAuthStrategy);
