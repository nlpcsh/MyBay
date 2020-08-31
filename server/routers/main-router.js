'use strict';

const router = require('express').Router();
const createMainController = require('../controllers/main-controller');

const mainController = createMainController();

router.get('/home', mainController.getHome);

module.exports = app => app.use(router);
