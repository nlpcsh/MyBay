'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let port = 8000;

app.use(express.static('../app'))

app.use(bodyParser.json());

require('./models');
// routes // https://youtu.be/Da4DL5-9JOI?t=4201
require('./routers')(app);

app.get('/', function(req, res) {
    res.send('Hello World!');
})

app.get('/', function(req, res) {
    res.send('Hello World!');
})

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
});