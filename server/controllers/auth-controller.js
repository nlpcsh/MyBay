'use strict';

const passport = require('passport');
const User = require('../models/user-model');


module.exports = function () {
    return {
        login(req, res, next) {
            const user = new User({
                username: req.body.username,
                password: req.body.password
            });

            req.login(user, error => {
                var user1  = user;
                if (error) {
                    next(error);
                    return;
                }

                passport.authenticate('local')(req, res, function () {
                    res.redirect('/profile');
                });
            });
        },
        logout(req, res) {
            req.logout();
            res.redirect('/home');
        },
        getLogin(req, res) {
            res.render('login');
        },
        register(req, res) {
            User.register({ username: req.body.email1 }, req.body.password1, function(err, user) {
                if (err) {
                    console.log(err);
                    res.redirect('/login');
                } else {
                    passport.authenticate('local')(req, res, function() {
                        res.redirect('/profile');
                    });
                }
            });
        }
    }
}