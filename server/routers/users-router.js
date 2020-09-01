'use strict';

const router = require('express').Router();
const createAuthController = require('../controllers/auth-controller');
const createUsersController = require('../controllers/users-controller');

const authController = createAuthController();
const usersController = createUsersController();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/login', authController.getLogin);

router.get('/logout', authController.logout);

router.get('/profile', usersController.getProfile);

router.get('/unauthorized', (req, res) => res.send('<h1>Not authorized!</h1>'));

module.exports = app => app.use(router);
