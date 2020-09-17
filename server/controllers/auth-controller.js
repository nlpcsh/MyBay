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
                if (error) {
                    next(error);
                    return;
                }

                passport.authenticate('local')(req, res, function () {
                    // set main template variable
                    res.locals.login = req.isAuthenticated();
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
            User.register(new User({ 
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }), req.body.password, function(err, user) {
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