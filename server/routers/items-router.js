'use strict';

const router = require('express').Router();
const createItemsController = require('../controllers/items-controller');

const itemsController = createItemsController();

router.get('/items', itemsController.getItems);

router.get('/setitems', itemsController.setItems);

module.exports = app => app.use(router);