'use strict';

const User = require('../models/user-model');

module.exports = function() {
    return {
        getProfile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).redirect('/login');
            } else {
                const user = req.user;
                res.status(200).render('profile', user);
            }
        },
        setAddress(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).redirect('/login');
            } else {
                const id = req.user.id;
                User.findByIdAndUpdate(id, {
                    contactInfo: {
                        tel: req.body.telephone,
                        address: {
                                country: req.body.country,
                                city: req.body.city,
                                street: req.body.street,
                                houseNumber: req.body.houseNumber,
                                zipCode: req.body.zipCode
                            }
                        }
                    }, function(err, updatedUser) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.status(200).render('profile', updatedUser);
                        }
                    }
                );
            }
        }
    }
}