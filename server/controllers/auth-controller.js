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
                    res.status(200).redirect('/profile');
                });
            });
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect('/home');
        },
        getLogin(req, res) {
            res.status(200).render('login');
        },
        register(req, res) {
            User.register({ username: req.body.username }, req.body.password, function(err, user) {
                var user1 = user;
                console.log(req.body.username);
                console.log(req.body.password);
                if (err) {
                    console.log(err);
                    //res.status(401).send(err);
                    res.status(401).render('login', err);
                } else {
                    passport.authenticate('local')(req, res, function() {
                        res.status(200).redirect('/profile');
                    });
                }
            });
        }
    }
}