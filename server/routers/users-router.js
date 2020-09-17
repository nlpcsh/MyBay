'use strict';

const router = require('express').Router();
const createAuthController = require('../controllers/auth-controller');
const createUsersController = require('../controllers/users-controller');
const passport = require('passport');

const authController = createAuthController();
const usersController = createUsersController();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/login', authController.getLogin);

router.get('/logout', authController.logout);

router.get('/profile', usersController.getProfile);

router.post('/profile/add-address', usersController.setAddress);

// Google login
router.get('/auth/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

router.get('/auth/google/mybay', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/profile');
});

module.exports = app => app.use(router);
