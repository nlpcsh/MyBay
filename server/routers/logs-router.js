'use strict';
let express = require('express');

let lastId = 0;
let logs = [];

let router = express.Router();

router.get('/', function(req, res) {
    res.json({
        result: logs
    });
}).post('/', function(req, res) {
    let log = req.body;
    log.id = ++lastId;
    log.date = new Date();
    logs.push(log);

    res.status(201).json(log);
});

module.exports = function(app) {
    app.use('/api/logs', router);
}