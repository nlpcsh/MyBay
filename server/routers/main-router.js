'use strict';

const router = require('express').Router();
const createMainController = require('../controllers/main-controller');

const mainController = createMainController();

router.get('/home', mainController.getHome);

router.get('/about', mainController.getAbout);

router.get('/contacts', mainController.getContacts);

module.exports = app => app.use(router);
