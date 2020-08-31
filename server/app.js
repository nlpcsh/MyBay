'use strict';

require('dotenv').config();

const port = process.env.PORT || 8000;

const app = require('./config/app');


app.listen(port, () =>
    console.log(`MyBay server is listening on port ${port}!`));
